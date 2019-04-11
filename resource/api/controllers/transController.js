import transaction from '../model/transaction';
import accounts from '../model/account';
import validate from '../controllers/validator';

class TransController {

  static debitTrans(req, res) {
    const account = accounts.find((acc => acc.accountNumber === parseInt(req.params.accountNumber)));
    if (!account) {
      return res.status(404).json({
        status: 404,
        error: 'Account not found',
      })
      ; }
    const val = validate.trans(req.body);
    if(val.error) { return res.status(400).json({
      status: 400,
      error: val.error.details[0].message
    });
    }
    if (account.balance < req.body.amount) {
      return res.status(400).json({
        status: 400,
        error: 'Insufficient fund',
      });
    }
    const accountBal = parseFloat(account.balance) - parseFloat(req.body.amount) ;
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
    return res.status(201).json({
      status: 201,
      data: {
        transactionId: transaction.length + 1,
        accountNumber: req.params.accountNumber,
        amount: req.body.amount,
        cashier: req.body.cashier,
        transactionType: 'debit',
        accountBalance: accountBal
      }
    });
  }

  static creditTrans(req, res) {
    const account = accounts.find((acc => acc.accountNumber === parseInt(req.params.accountNumber)));
    if (!account) {
      return res.status(404).json({
        status: 404,
        error: 'Account not found',
      })
      ; }
    const val = validate.trans(req.body);
    if(val.error) { return res.status(400).json({
      status: 400,
      error: val.error.details[0].message
    });
    }
    const accountBal = parseFloat(account.balance) + parseFloat(req.body.amount) ;
    transaction.push({
      id: transaction.length + 1,
      createdOn: new Date(),
      type: 'credit',
      accountNumber: req.params.accountNumber,
      cashier: req.body.cashier,
      amount: req.body.account,
      oldBalance: account.balance,
      newBalance: accountBal,
    });
    return res.status(201).json({
      status: 201,
      data: {
        transactionId: transaction.length + 1,
        accountNumber: req.params.accountNumber,
        amount: req.body.amount,
        cashier: req.body.cashier,
        transactionType: 'credit',
        accountBalance: accountBal
      }
    });
  }
}

export default TransController;
