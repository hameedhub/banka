import accounts from '../model/account';
import transaction from '../model/transaction';
import users from '../model/user';
import pool from '../model/database';

class Check {
  static accNum(accountNumber) {
    const account = accounts.find(acc => acc.accountNumber === +accountNumber);
    return account;
  }

  static trans(accountNumber) {
    const trans = transaction.filter(tran => tran.accountNumber === +accountNumber);
    return trans;
  }

  static accEmail(email) {
    const acc = accounts.filter(account => account.ownerEmail === email);
    return acc;
  }

  static userId(id) {
    const userId = users.find(user => user.id === +id);
    return userId;
  }

  static email(email) {
    const userEmail = users.find(user => user.email === email);
    return userEmail;
  }

  static status(status) {
    const accStatus = accounts.filter(acc => acc.status === status);
    return accStatus;
  }

}

export default Check;
