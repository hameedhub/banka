import accounts from '../model/account';
import transaction from '../model/transaction';
import users from '../model/user';

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

  static data(id) {
    const userDetails = users.find(user => user.id === +id);
    return userDetails;
  }

}

export default Check;
