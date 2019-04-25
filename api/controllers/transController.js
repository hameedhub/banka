import Mail from './mailController';
import Model from '../model/Model';

class TransController {
  static async getTransactionById(req, res) {
    try {
      const table = new Model();
      const response = await table.query('SELECT * FROM transactions WHERE id = $1', [req.params.id]);
      if (response.rowCount === 0) {
        return res.json({
          status: 404,
          error: 'Transaction not found',
        });
      }
      return res.json({
        status: 200,
        data: response.rows,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }

  static async debitTransaction(req, res) {
    if (req.userData.type !== 'staff') {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized token for this session',
      });
    }
    try {
      const table = new Model();
      const response = await table.query('SELECT * FROM accounts WHERE accountnumber = $1', [req.params.accountNumber]);
      if (typeof response === 'undefined') {
        return res.status(400).json({
          status: 400,
          error: 'Invalid account number',
        });
      }
      if (response.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
        });
      }
      const accountEmail = response.rows[0].owneremail;
      const oldBalance = response.rows[0].balance;
      if (oldBalance < +req.body.amount) {
        return res.status(400).json({
          status: 400,
          error: 'Insufficient fund',
        });
      }
      const newBalance = oldBalance - +req.body.amount;
      const transaction = {
        createdOn: new Date(),
        type: 'debit',
        accountNumber: req.params.accountNumber,
        cashier: req.userData.id,
        amount: req.body.amount,
        oldBalance,
        newBalance,
      };
      
      const query = `INSERT INTO transactions ( createdOn, type, accountnumber, cashier, amount, oldBalance, newBalance)
      VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
      const values = Object.values(transaction);
      const data = await table.query(query, values);
      const { ...transactionData } = data.rows[0];
      await table.query('UPDATE accounts SET balance = $1 WHERE accountnumber = $2', [transactionData.newbalance, transactionData.accountnumber]);
      Mail.composer(accountEmail, transactionData.type, transactionData.amount, transactionData.newbalance);
      return res.status(201).json({
        status: 201,
        data: [{
          transactionId: transactionData.id,
          accountNumber: transactionData.accountnumber,
          amount: transactionData.amount,
          cashier: transactionData.cashier,
          transactionType: transactionData.type,
          accountBalance: transactionData.newbalance.toFixed(2),
        }],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }

  static async creditTransaction(req, res) {
    if (req.userData.type !== 'staff') {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized token for this session',
      });
    }
    try {
      const table = new Model();
      const response = await table.query('SELECT * FROM accounts WHERE accountnumber = $1', [req.params.accountNumber]);
      if (typeof response === 'undefined') {
        return res.status(400).json({
          status: 400,
          error: 'Invalid account number',
        });
      }
      if (response.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
        });
      }
      const accountEmail = response.rows[0].owneremail;
      const oldBalance = response.rows[0].balance;
      const newBalance = oldBalance + +req.body.amount;
      const transaction = {
        createdOn: new Date(),
        type: 'credit',
        accountNumber: req.params.accountNumber,
        cashier: req.userData.id,
        amount: req.body.amount,
        oldBalance,
        newBalance,
      };

      const query = `INSERT INTO transactions ( createdOn, type, accountnumber, cashier, amount, oldBalance, newBalance)
      VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
      const values = Object.values(transaction);
      const data = await table.query(query, values);
      const { ...transactionData } = data.rows[0];
      await table.query('UPDATE accounts SET balance = $1 WHERE accountnumber = $2', [transactionData.newbalance, transactionData.accountnumber]);
      Mail.composer(accountEmail, transactionData.type, transactionData.amount, transactionData.newbalance);
      return res.status(201).json({
        status: 201,
        data: [{
          transactionId: transactionData.id,
          accountNumber: transactionData.accountnumber,
          amount: transactionData.amount,
          cashier: transactionData.cashier,
          transactionType: transactionData.type,
          accountBalance: transactionData.newbalance.toFixed(2),
        }],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }
}

export default TransController;
