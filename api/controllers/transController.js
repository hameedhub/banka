import validate from './validator';
import Mail from './mailController';
import pool from '../model/database';

class TransController {
  static getTransById(req, res) {
    pool.query('SELECT * FROM transactions WHERE id = $1', [req.params.id], (err, result)=>{
      if (result.rowCount === 0) {
        return res.json({
          status: 404,
          error: 'Transaction not found',
        });
      }
      return res.json({
        status: 200,
        data: result.rows[0]
      });
    })
  }

  static debitTrans(req, res) {
    if (req.userData.type !== 'staff') {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized token for this session',
      });
    }
    const val = validate.trans(req.body);
    if (val.error) {
      return res.status(400).json({
        status: 400,
        error: val.error.details[0].message,
      });
    }
    pool.query('SELECT * FROM accounts WHERE accountnumber = $1', [req.params.accountNumber], (err, result) => {
      if (typeof result === 'undefined') {return res.status(400).json({
        status: 400,
        error: 'Invalid account number'
      })};
      if (result.rowCount === 0) { 
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
        }); 
      }
      const accountEmail = result.rows[0].owneremail;
      const oldBalance = result.rows[0].balance;
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
      pool.connect((err, client, done) => {
        const query = `INSERT INTO transactions ( createdOn, type, accountnumber, cashier, amount, oldBalance, newBalance)
      VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const values = Object.values(transaction);
        client.query(query, values, (err, data) => {
          done();
          if (err) {
            return res.status(500).json({
              status: 500,
              error: err,
            });
          }
          const { ...tranData } = data.rows[0];
          pool.query('UPDATE accounts SET balance = $1 WHERE accountnumber = $2', [tranData.newbalance, tranData.accountnumber], error => error);
          Mail.composer(accountEmail, tranData.type, tranData.amount, tranData.newbalance);
          return res.status(201).json({
            status: 201,
            data: {
              transactionId: tranData.id,
              accountNumber: tranData.accountnumber,
              amount: tranData.amount,
              cashier: tranData.cashier,
              transactionType: tranData.type,
              accountBalance: tranData.newbalance.toFixed(2),
            },
          });
        });
      });
    });
  }

  static creditTrans(req, res) {
    if (req.userData.type !== 'staff') {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized token for this session',
      });
    }
    const val = validate.trans(req.body);
    if (val.error) {
      return res.status(400).json({
        status: 400,
        error: val.error.details[0].message,
      });
    }
    pool.query('SELECT * FROM accounts WHERE accountnumber = $1', [req.params.accountNumber], (err, result) => {
      if (typeof result === 'undefined') {return res.status(400).json({
        status: 400,
        error: 'Invalid account number'
      })};
      if (result.rowCount === 0) { 
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
        }); 
      }
      const accountEmail = result.rows[0].owneremail;
      const oldBalance = result.rows[0].balance;
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
      pool.connect((err, client, done) => {
        const query = `INSERT INTO transactions ( createdOn, type, accountnumber, cashier, amount, oldBalance, newBalance)
      VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const values = Object.values(transaction);
        client.query(query, values, (err, data) => {
          done();
          if (err) {
            return res.status(500).json({
              status: 500,
              error: err,
            });
          }
          const { ...tranData } = data.rows[0];
          pool.query('UPDATE accounts SET balance = $1 WHERE accountnumber = $2', [tranData.newbalance, tranData.accountnumber], error => error);
          Mail.composer(accountEmail, tranData.type, tranData.amount, tranData.newbalance);
          return res.status(201).json({
            status: 201,
            data: {
              transactionId: tranData.id,
              accountNumber: tranData.accountnumber,
              amount: tranData.amount,
              cashier: tranData.cashier,
              transactionType: tranData.type,
              accountBalance: tranData.newbalance.toFixed(2),
            },
          });
        });
      });
    });
  }
  //class ends here..
}

export default TransController;
