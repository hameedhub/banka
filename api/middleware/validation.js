import validation from '../helper/validator';


class Validation {
  static signupData(req, res, next) {
    const result = validation.signup(req.body);
    if (result.error) { return res.status(404).json({ status: 404, error: result.error.details[0].message });
    }
    return next();
  }

  static signinData(req, res, next) {
    const result = validation.signin(req.body);
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
}
export default Validation;