import Model from '../model/Model';

class AccountController {
    //  get all accounts only staff and admin
    static async getAllAccount(req, res) {
        if (req.userData.type !== 'staff' && req.userData.isAdmin === false) {
            return res.status(401).json({
                status: 401,
                error: 'Unauthorized token, you have to be a staff or admin',
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
            }
            return res.status(200).json({
                status: 200,
                data: response.rows,
            });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error: 'Something went wrong',
            });
        }
    }

    // creeate account only client
    static async createAccount(req, res) {
        if (req.userData.type !== 'client' && req.userData.isAdmin !== true) {
            return res.status(401).json({
                status: 401,
                error: 'Unauthorized token, you have to be a client or admin',
            });
        }

        if (req.body.type !== 'current' && req.body.type !== 'savings') {
            return res.status(401).json({
                status: 401,
                error: 'Account type can only be current or savings',
            });
        }
        const accountNumber = Math.floor(100000 + Math.random() * 9000000000);
        const account = {
            accountNumber,
            createdOn: new Date(),
            ownerEmail: req.userData.email,
            type: req.body.type,
            status: 'draft',
            balance: req.body.openingBalance,
        };
        try {
            const query = `INSERT INTO accounts(accountNumber, createdOn, ownerEmail, type, status, balance)
    VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
            const values = Object.values(account);
            const table = new Model();
            const response = await table.query(query, values);
            const {...accountData } = response.rows[0];
            return res.status(201).json({
                status: 201,
                data: [{
                    accountNumber: accountData.accountnumber,
                    firstname: req.userData.firstname,
                    lastname: req.userData.lastname,
                    email: req.userData.email,
                    type: req.body.type,
                    openingBalance: req.body.openingBalance,
                }],
            });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error: 'Something went wrong',
            });
        }
    }

    // change account status
    static async accountStatus(req, res) {
        if (req.userData.isAdmin !== true && req.userData.type !== 'staff') {
            return res.status(401).json({
                status: 401,
                error: 'Unauthorized token, you have to be a staff or admin to carry out this operation',
            });
        }
        if (req.body.status !== 'active' && req.body.status !== 'dormant' && req.body.status !== 'draft') {
            return res.status(404).json({
                status: 404,
                error: 'Invalid status property, status can only be active, dormant or draft',
            });
        }
        try {
            const table = new Model();
            const response = await table.query('UPDATE accounts SET status = $1 WHERE accountnumber = $2 RETURNING *', [req.body.status, req.params.accountNumber]);
            if (response.rows.length === 0) {
                return res.status(404).json({
                    status: 404,
                    error: 'Account number not found not found',
                });
            }
            const accountData = response.rows[0];
            return res.status(200).json({
                status: 200,
                data: [{
                    accountNumber: accountData.accountnumber,
                    status: accountData.status,
                }],
            });
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error,
            });
        }
    }

    // Delete account
    static async deleteAccount(req, res) {
        if (req.userData.isAdmin !== true) {
            return res.status(401).json({
                status: 401,
                error: 'Unauthorized token, only admin can delete user account',
            });
        }
        try {
            const table = new Model();
            const response = await table.query('DELETE FROM accounts WHERE accountnumber = $1', [req.params.accountNumber]);
            if (response.rowCount === 0) {
                return res.status(404).json({
                    status: 404,
                    error: 'Account number not found',
                });
            }
            return res.json({
                status: 204,
                message: 'Account successfully deleted',
            }).status(204);
        } catch (error) {
            return res.status(400).json({
                status: 400,
                error: 'Something went wrong',
            });
        }
    }

    static async getTransaction(req, res) {
        try {
            const table = new Model();
            // client get transactions
            if (req.userData.type === 'client') {
                const { rows } = await table.query('SELECT * FROM accounts WHERE owneremail = $1', [req.userData.email]);
                const accountDetails = await rows.find(row => row.accountnumber === req.params.accountNumber);
                if (typeof accountDetails === 'undefined') {
                    return res.status(404).json({
                        status: 404,
                        error: 'You are not allowed to view this account transaction, you have to login as admin or staff to view',
                    });
                }
            }
            const response = await table.query('SELECT * FROM transactions WHERE accountnumber = $1', [req.params.accountNumber]);
            if (response.rowCount === 0) {
                return res.status(404).json({
                    status: 404,
                    error: 'No transaction found on this acccount',
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

    // get account details
    static async getDetails(req, res) {
        try {
            const table = new Model();
            if (req.userData.type === 'client') {
                const { rows } = await table.query('SELECT * FROM accounts WHERE owneremail = $1', [req.userData.email]);
                const account = await rows.find(row => row.accountnumber === req.params.accountNumber);
                if (typeof account === 'undefined') {
                    return res.status(404).json({
                        status: 404,
                        error: 'You are not allowed to view this account details, you have to login as admin or staff to view',
                    });
                }
                return res.status(200).json({
                    status: 200,
                    data: account,
                });
            }
            const response = await table.query('SELECT createdon, accountnumber, owneremail, type, status, balance FROM accounts WHERE accountnumber = $1', [req.params.accountNumber]);
            if (response.rowCount === 0) {
                return res.status(404).json({
                    status: 404,
                    error: 'Account not found',
                });
            }
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
}

export default AccountController;