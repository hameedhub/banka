import pool from '../model/database';

class AccountController {
  static getAll(req, res) {
    if (req.userData.type !== 'staff') {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized token for this session',
      });
    }
    if (typeof req.query.status === 'undefined' || req.query.status === null) {
      pool.query('SELECT * FROM accounts', (err, result) => {
        return res.status(200).json({
          status: 200,
          data: result.rows,
        })
      })
    } else {
      pool.query('SELECT * FROM accounts WHERE status = $1', [req.query.status], (err, result) => {
        if(result.rows.length === 0){
          return res.status(404).json({
            status: 404,
            error: 'Resource not found'
          })
        }
        return res.status(200).json({
          status: 200,
          data: result.rows,
        })
      })
    }

  }

  static createAccount(req, res) {
    const tokenData = req.userData;
    if (tokenData === undefined) {
      return res.status(401).json({
        status: 401,
        error: 'Session closed for this token, login again',
      });
    }
    const accNum = Math.floor(100000 + Math.random() * 9000000000);
    const account = {
      accountNumber: accNum,
      createdOn: new Date(),
      ownerEmail: tokenData.email,
      type: req.body.type,
      status: 'active',
      balance: req.body.openingBalance,
    };
    pool.connect((err, client, done) => {
      const query = `INSERT INTO accounts(accountNumber, createdOn, ownerEmail, type, status, balance)
    VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
      const values = Object.values(account);
      client.query(query, values, (err, data) => {
        done();
        if (err) {
          return res.status(500).json({
            status: 500,
            error: err,
          });
        }
        const { ...accountData } = data.rows[0];
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
      });
    });
  }

  static accountStatus(req, res) {
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
    pool.query('UPDATE accounts SET status = $1 WHERE accountnumber = $2 RETURNING *', [req.body.status, req.params.accountNumber], (err, result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
        });
      }
      const accountData = result.rows[0];
      return res.status(200).json({
        status: 200,
        data: {
          accountNumber: accountData.accountnumber,
          status: accountData.status,
        },
      });
    });
  }

  static deleteAccount(req, res) {
    if (req.userData.isAdmin !== true) {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized token for this session',
      });
    }
    pool.query('DELETE FROM accounts WHERE accountnumber = $1', [req.params.accountNumber], (err, result) => {
      if (result.rowCount === 0) { 
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
        }); 
      }
      return res.json({
        status: 204,
        message: 'Account successfully deleted',
      }).status(204);
    });
  }

  static getTrans(req, res) {
    pool.query('SELECT * FROM transactions WHERE accountnumber = $1', [req.params.accountNumber], (err, result)=>{
      if (result.rowCount === 0) {
        return res.json({
          status: 404,
          error: 'No transaction found on this acccount',
        });
      }
      return res.json({
        status: 200,
        data: result.rows[0]
      });
    })
  }

  static getDetails(req, res) {
    pool.query('SELECT createdon, accountnumber, owneremail, type, status, balance FROM accounts WHERE accountnumber = $1', [req.params.accountNumber], (err, result)=>{
      if (result.rowCount === 0) {
        return res.json({
          status: 404,
          error: 'Account not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: result.rows[0]
      });
    })
  }

}

export default AccountController;
