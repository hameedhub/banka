import Model from '../model/Model';

class AccountController {

  static async getAllAccount(req, res) {
    if (req.userData.type !== 'staff') {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized token for this session',
      });
    }
    try {
      const table = new Model();
      if (typeof req.query.status === 'undefined' || req.query.status === null) {
        const response = await table.query('SELECT * FROM accounts');
        return res.status(200).json({
          status: 200,
          data: response.rows,
        });
      }
      const response = await table.query('SELECT * FROM accounts WHERE status = $1', [req.query.status]);
      if (response.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Resource not found',
        });
      };
      return res.status(200).json({
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

  static async createAccount(req, res) {
    const tokenData = req.userData;
    if (tokenData === undefined) {
      return res.status(401).json({
        status: 401,
        error: 'Session closed for this token, login again',
      });
    }
    const accountNumber = Math.floor(100000 + Math.random() * 9000000000);
    const account = {
      accountNumber,
      createdOn: new Date(),
      ownerEmail: tokenData.email,
      type: req.body.type,
      status: 'active',
      balance: req.body.openingBalance,
    };
    try {
      const query = `INSERT INTO accounts(accountNumber, createdOn, ownerEmail, type, status, balance)
    VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
      const values = Object.values(account);
      const table = new Model();
      const response = await table.query(query, values);
      const { ...accountData } = response.rows[0];
      return res.status(201).json({
        status: 201,
        data: {
          accountNumber: accountData.accountnumber,
          firstname: tokenData.firstname,
          lastname: tokenData.lastname,
          email: tokenData.email,
          type: req.body.type,
          openingBalance: req.body.openingBalance,
        },
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }

  static async accountStatus(req, res) {
    if (req.userData.isAdmin !== true) {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized token for this session',
      });
    }
    if (req.body.status !== 'active' && req.body.status !== 'dormant') {
      return res.status(404).json({
        status: 404,
        error: 'Invalid status property',
      });
    }
    try {
      const table = new Model();
      const response = await table.query('UPDATE accounts SET status = $1 WHERE accountnumber = $2 RETURNING *', [req.body.status, req.params.accountNumber]);
      if (response.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
        });
      }
      const accountData = response.rows[0];
      return res.status(200).json({
        status: 200,
        data: {
          accountNumber: accountData.accountnumber,
          status: accountData.status,
        },
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }

  static async deleteAccount(req, res) {
    if (req.userData.isAdmin !== true) {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized token for this session',
      });
    }
    try {
      const table = new Model();
      const response = await table.query('DELETE FROM accounts WHERE accountnumber = $1', [req.params.accountNumber]);
      if (response.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
        });
      }
      return res.json({
        status: 204,
        message: 'Account successfully deleted',
      }).status(204);
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }

  static async getTransaction(req, res) {
    try {
      const table = new Model();
      const response = await table.query('SELECT * FROM transactions WHERE accountnumber = $1', [req.params.accountNumber]);
      if (response.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'No transaction found on this acccount',
        });
      }
      return res.json({
        status: 200,
        data: response.rows[0],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }

  static async getDetails(req, res) {
    try {
      const table = new Model();
      const response = await table.query('SELECT createdon, accountnumber, owneremail, type, status, balance FROM accounts WHERE accountnumber = $1', [req.params.accountNumber]);
      if (response.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: response.rows[0],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }
}

export default AccountController;
