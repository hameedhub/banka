import accounts from '../model/account';
import transaction from '../model/transaction';

class Check {
  static accNum(data) {
    const account = accounts.find((acc => acc.accountNumber === parseInt(data)));
    return account;
  }

  static trans(data) {
    const trans = transaction.filter((tran => tran.accountNumber === parseInt(data)));
    return trans;
  }
}

export default Check;
