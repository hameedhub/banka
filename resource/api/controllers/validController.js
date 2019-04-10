import Joi from 'joi';
import users from '../model/user';

class validController {
  static details(userDetails) {
    const schema = {
      email: Joi.string().email({ minDomainAtoms: 2 }),
      firstName: Joi.string().min(3).max(30).required(),
      lastName: Joi.string().min(3).max(30).required(),
      password: Joi.string().min(4).max(50).required(),
    };
    return Joi.validate(userDetails, schema);
  }

  static id(id) { return users.find(user => user.id === parseInt(id)); }

}

export default validController;
