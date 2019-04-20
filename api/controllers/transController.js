import transaction from '../model/transaction';
import check from '../helper/checkField';
import validate from './validator';
import Mail from './mailController';

class TransController {
  static getTransById(req, res) {
    const trans = transaction.find(tran => tran.id === +req.params.id);
    if (!trans) {
      return res.json({
        status: 404,
        error: 'Transaction Id does not exist',
      });
    }
    return res.json({
      status: 200,
      data: trans,
    });

  }

  static debitTrans(req, res) {
    if (req.userData.type != 'staff') {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized token for this session',
      });
    }
    const account = check.accNum(req.params.accountNumber);
    if (!account) {
      return res.status(404).json({
        status: 404,
        error: 'Account not found',
      });
    }
    const val = validate.trans(req.body);
    if (val.error) {
      return res.status(400).json({
        status: 400,
        error: val.error.details[0].message,
      });
    }
    if (+account.balance < +req.body.amount) {
      return res.status(400).json({
        status: 400,
        error: 'Insufficient fund',
      });
    }
    const accountBal = account.balance - +req.body.amount;
    transaction.push({
      id: transaction.length + 1,
      createdOn: new Date(),
      type: 'debit',
      accountNumber: req.params.accountNumber,
      cashier: req.body.cashier,
      amount: req.body.account,
      oldBalance: account.balance,
      newBalance: accountBal,
    });
    Mail.composer(account.owner, 'debit', req.body.amount, accountBal);
    return res.status(201).json({
      status: 201,
      data: {
        transactionId: transaction.length + 1,
        accountNumber: req.params.accountNumber,
        amount: req.body.amount,
        cashier: req.body.cashier,
        transactionType: 'debit',
        accountBalance: accountBal,
      },
    });
  }

  static creditTrans(req, res) {
    if (req.userData.type != 'staff') {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized token for this session',
      });
    }
    const account = check.accNum(req.params.accountNumber);
    if (!account) {
      return res.status(404).json({
        status: 404,
        error: 'Account not found',
      });
    }
    const val = validate.trans(req.body);
    if (val.error) {
      return res.status(400).json({
        status: 400,
        error: val.error.details[0].message,
      });
    }
    const accountBal = account.balance + +req.body.amount;
    transaction.push({
      id: transaction.length + 1,
      createdOn: new Date(),
      type: 'credit',
      accountNumber: req.params.accountNumber,
      cashier: req.body.cashier,
      amount: req.body.amount,
      oldBalance: account.balance,
      newBalance: accountBal,
    });
    Mail.composer(account.owner, 'credit', req.body.amount, accountBal);
    return res.status(201).json({
      status: 201,
      data: {
        transactionId: transaction.length + 1,
        accountNumber: req.params.accountNumber,
        amount: req.body.amount,
        cashier: req.body.cashier,
        transactionType: 'credit',
        accountBalance: accountBal,
      },
    });
  }
}

export default TransController;
