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
        firstName: owner.firstName,
        lastName: owner.lastName,
        email: owner.email,
        type: req.body.type,
        openingBalance: req.body.openingBalance,
      },
    });
  }
}

export default AccountController;
