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
  static userId(data){
   const userId = users.find(user => user.id === +data);
   return userId;
  }
}

export default Check;
