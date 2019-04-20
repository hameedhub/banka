import accounts from '../model/account';
import validation from './validator';
import check from '../helper/checkField';

class AccountController {
  static getAll(req, res) {
    if (req.userData.isAdmin != true) {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized token for this session',
      });
    }
    return res.status(200).json({
      status: 200,
      data: accounts,
    });
  }

  static createAccount(req, res) {
    const result = validation.accValildation(req.body);
    if (result.error) {
      return res.status(404).json({
        status: 404,
        error: result.error.details[0].message,
      });
    }
    const accNum = check.accNum(req.body.accountNumber);
    if (accNum) {
      return res.status(404).json({
        status: 404,
        error: 'Account number already exist',
      });
    }
    const data = check.data(req.userData.id);
    if (data === undefined) {
      return res.status(401).json({
        status: 401,
        error: 'Session closed for this token, login again',
      });
    }
    const account = {
      id: accounts.length + 1,
      accountNumber: req.body.accountNumber,
      createdOn: new Date(),
      ownerEmail: 'ggodd',
      type: req.body.type,
      status: 'active',
      balance: req.body.openingBalance,
    };
    accounts.push(account);
    return res.status(201).json({
      status: 201,
      data: {
        accountNumber: req.body.accountNumber,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        type: req.body.type,
        openingBalance: req.body.openingBalance,
      },
    });
  }

  static accountStatus(req, res) {
    if (req.userData.isAdmin != true) {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized token for this session',
      });
    }
    const find = check.accNum(req.params.accountNumber);
    if (!find) {
      return res.json({
        status: 204,
        error: 'Account number not found',
      });
    }
    if (!req.body.status) {
      return res.status(404).json({
        status: 404,
        error: 'status is required',
      });
    }
    find.status = req.body.status;
    return res.status(200).json({
      status: 200,
      data: {
        accountNumber: find.accountNumber,
        status: find.status,
      },
    });
  }

  static deleteAccount(req, res) {
    if (req.userData.isAdmin != true) {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized token for this session',
      });
    }
    const find = check.accNum(req.params.accountNumber);
    if (!find) {
      return res.json({
        status: 204,
        error: 'Account number not found',
      });
    }
    const accIndex = accounts.indexOf(find);
    accounts.splice(accIndex, 1);
    return res.json({
      status: 204,
      message: 'Account successfully deleted',
    }).status(204);
  }

  static getTrans(req, res) {
    const find = check.accNum(req.params.accountNumber);
    if (!find) {
      return res.json({
        status: 204,
        error: 'Account number not found',
      });
    }
    const trans = check.trans(req.params.accountNumber);
    if (!trans) {
      return res.json({
        status: 200,
        message: 'No transaction found on this account',
      });
    }
    return res.status(200).json({
      status: 200,
      data: trans,
    });
  }

  static getDetails(req, res) {
    const account = check.accNum(req.params.accountNumber);
    if (!account) {
      return res.status(404).json({
        status: 404,
        error: 'Invalied account',
      })
      ;
    }
    return res.status(200).json({
      status: 200,
      data: account,
    });
  }

}

export default AccountController;
