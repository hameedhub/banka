import Joi from 'joi';

class Validator {

  static signup(data) {
    const schema = {
      email: Joi.string().email({ minDomainAtoms: 2 }),
      firstname: Joi.string().min(3).max(30).required(),
      lastname: Joi.string().min(3).max(30).required(),
      password: Joi.string().min(4).max(50).required(),
    };
    return Joi.validate(data, schema);
  }

  static signupAdmin(data) {
    const schema = {
      email: Joi.string().email({ minDomainAtoms: 2 }),
      firstname: Joi.string().min(3).max(30).required(),
      lastname: Joi.string().min(3).max(30).required(),
      password: Joi.string().min(4).max(50).required(),
      isAdmin: Joi.boolean().required(),
    };
    return Joi.validate(data, schema);
  }

  static signin(data) {
    const schema = {
      email: Joi.string().email({ minDomainAtoms: 2 }),
      password: Joi.string().min(4).max(50).required(),
    };
    return Joi.validate(data, schema);
  }

  static account(data) {
    const schema = {
      type: Joi.string().required(),
      openingBalance: Joi.number().required()
    };
    return Joi.validate(data, schema);
  }

  static transaction(data) {
    const schema = {
      amount: Joi.number().min(1).max(900000000).required(),
    };
    return Joi.validate(data, schema);
  }

  static getAccounts(data) {
    const schema = {
      email: Joi.string().email({ minDomainAtoms: 2 }),
    };
    return Joi.validate(data, schema);
  }

  static accountNumber(data) {
    const schema = {
      accountNumber: Joi.number().required(),
    };
    return Joi.validate(data, schema);
  }

  static accountStatus(data) {
    const schema = {
      status: Joi.string().min(3).max(30).required(),
    };
    return Joi.validate(data, schema);
  }

  static getTransactionById(data) {
    const schema = {
      id: Joi.number().min(1).max(90000000).required(),
    };
    return Joi.validate(data, schema);
  }

}
export default Validator;
