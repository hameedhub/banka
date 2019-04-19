import accounts from '../model/account';
import users from '../model/user';
import validation from './validator';

class AccountController {
  static createAccount(req, res) {
    const result = validation.accValildation(req.body);
    if (result.error) {
      return res.status(404).json({
        status: 404,
        error: result.error.details[0].message,
      });
    }
    const owner = users.find(user => user.id === req.body.owner);
    if (!owner) {
      return res.status(404).json({
        status: 404,
        error: 'User Id does not exist',
      });
    }
    const accNum = accounts.find(acc => acc.accountNumber === req.body.accountNumber);
    if (accNum) {
      return res.status(404).json({
        status: 404,
        error: 'Account number already exist',
      });
    }
    const account = {
      id: accounts.length + 1,
      accountNumber: req.body.accountNumber,
      createdOn: new Date(),
      owner: owner.id,
      type: req.body.type,
      status: 'active',
      balance: req.body.openingBalance,
    };
    accounts.push(account);
    return res.status(201).json({
      status: 201,
      data: {
        accountNumber: req.body.accountNumber,
        firstname: owner.firstname,
        lastname: owner.lastname,
        email: owner.email,
        type: req.body.type,
        openingBalance: req.body.openingBalance,
      },
    });
  }

  static accountStatus(req, res) {
    if (req.userData.isAdmin != true) {return res.status(401).json({
      status: 401,
      error: 'Unauthorized token for this session'
    });}
    const account = accounts.find((accNum => accNum.accountNumber === parseInt(req.params.accountNumber)));
    if (!account) { 
      return res.status(404).json({
        status: 404,
        error: 'Account number not found' 
      }); 
    }
    if (!req.body.status) return res.status(404).json({
      status: 404,
      error: 'status is required'
    });
    account.status = req.body.status;
    return res.status(200).json({
      status: 200,
      data: {
        accountNumber: account.accountNumber,
        status: account.status,
      },
    });
  }

  static deleteAccount(req, res) {
    if (req.userData.isAdmin != true) {return res.status(401).json({
      status: 401,
      error: 'Unauthorized token for this session'
    });}
    const account = accounts.find((accNum => accNum.accountNumber === parseInt(req.params.accountNumber)));
    if (!account) { 
      return res.status(404).json({
        status: 404,
        error: 'Account number not found' 
      }); 
    }
    const accIndex = accounts.indexOf(account);
    accounts.splice(accIndex, 1);
    return res.json({
      status: 204,
      message: 'Account successfully deleted',
    }).status(204);
  }
}

export default AccountController;
