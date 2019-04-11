import Joi from 'joi';

class Validator {

  static details(data) {
    const schema = {
      email: Joi.string().email({ minDomainAtoms: 2 }),
      firstName: Joi.string().min(3).max(30).required(),
      lastName: Joi.string().min(3).max(30).required(),
      password: Joi.string().min(4).max(50).required(),
    };
    return Joi.validate(data, schema);
  }

  static accValildation(data) {
    const schema = {
      accountNumber: Joi.number().min(8).required(),
      owner: Joi.number().required(),
      type: Joi.string().required(),
      openingBalance: Joi.number().required()
    };
    return Joi.validate(data, schema);
  }
}
export default Validator;
