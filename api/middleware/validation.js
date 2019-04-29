import validation from '../helper/validator';


class Validation {
  static signup(req, res, next) {
    const result = validation.signup(req.body);
    if (result.error) { return res.status(404).json({ status: 404, error: result.error.details[0].message });
    }
    return next();
  }

  static signupAdmin(req, res, next) {
    const result = validation.signupAdmin(req.body);
    if (result.error) { return res.status(404).json({ status: 404, error: result.error.details[0].message });
    }
    return next();
  }

  static signin(req, res, next) {
    const result = validation.signin(req.body);
    if (result.error) { return res.status(404).json({ status: 404, error: result.error.details[0].message });
    }
    return next();
  }

  static getAccountParams(req, res, next) {
    const result = validation.getAccounts(req.params);
    if (result.error) { return res.status(404).json({ status: 404, error: result.error.details[0].message });
    }
    return next();
  }

  static getTransactionById(req, res, next) {
    const result = validation.getTransactionById(req.params);
    if (result.error) { return res.status(404).json({ status: 404, error: result.error.details[0].message });
    }
    return next();
  }

  static accountNumber(req, res, next) {
    const result = validation.accountNumber(req.params);
    if (result.error) { return res.status(404).json({ status: 404, error: result.error.details[0].message });
    }
    return next();
  }

  static accountData(req, res, next) {
    const result = validation.account(req.body);
    if (result.error) { return res.status(404).json({ status: 404, error: result.error.details[0].message });
    }
    return next();
  }

  static transactionData(req, res, next) {
    const result = validation.transaction(req.body);
    if (result.error) { return res.status(404).json({ status: 404, error: result.error.details[0].message });
    }
    return next();
  }

  static accountStatus(req, res, next) {
    const result = validation.accountStatus(req.body);
    if (result.error) { return res.status(404).json({ status: 404, error: result.error.details[0].message });
    }
    return next();
  }
}
export default Validation;