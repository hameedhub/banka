import accounts from '../model/account';
import transaction from '../model/transaction';
import users from '../model/user';

class Check {
  static accNum(data) {
    const account = accounts.find(acc => acc.accountNumber === +data);
    return account;
  }

  static trans(data) {
    const trans = transaction.filter(tran => tran.accountNumber === +data);
    return trans;
  }

  static accEmail(data) {
    const acc = accounts.filter(account => account.ownerEmail === data);
    return acc;
  }

  static userId(data) {
    const userId = users.find(user => user.id === +data);
    return userId;
  }

  static email(data) {
    const userEmail = users.find(user => user.email === data);
    return userEmail;
  }

}

export default Check;
