import bcrypt from 'bcrypt';
import users from '../model/user';
import validation from './validController';

const salt = bcrypt.genSaltSync(10);

class UserController {

  static getUsers(req, res) {
    return res.status(200).json({
      status: 200,
      data: users
    });
  }

  static getUserById(req, res) {
    const userData = validation.id(req.params.id);
    if (!userData) res.status(404).json({ error: 'User not found' });
    return res.status(200).json({
      status: 200,
      data: userData
    });
  };

  static signUp(req, res) {
    const result = validation.details(req.body);
    if (result.error) return res.status(404).json({ error: result.error.details[0].message });
    const userEmail = users.find(user => user.email === req.body.email);
    if (userEmail) return res.json({ error: 'Email already in use' });
    const user = {
      token: '45erkjherht45495783',
      id: users.length + 1,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: bcrypt.hashSync(req.body.password, salt),
      type: 'client',
      isAdmin: false,
    };
    users.push(user);
    return res.status(201).json({ 
      status: 201,
      data: user });
  };

  static loginUser(req, res) {
    const mail = users.find(user => user.email === req.body.email);
    if (!mail) return res.status(404).json({ error: 'Incorrect email address' });

    const compare = bcrypt.compareSync(req.body.password, mail.password);
    if (compare === false) return res.status(404).json({ error: 'Incorrect Password' });
    return res.status(200).json({
      status: 200,
      data: mail
    });
  }

  static sendToken(req, res) {
    const userMail = users.find(user => user.email === req.body.email);
    if (!userMail) return res.status(404).json({ status: 404, error: 'Email does not exist' });
    return res.status(200).json({
      status: 200,
      message: 'Token sent!',
    });
  }

  static setPassword(req, res) {
    const mailToken = users.find(user => user.email === req.params.email);
    if (!mailToken) return res.status(404).json({ status: 200, error: 'Invaild Token' });
    if (mailToken) mailToken.password = bcrypt.hashSync(req.body.password, salt);
    return res.status(200).json({
      status: 200,
      message: 'Password changed!',
    });
  }

  static deleteUser(req, res) {
    const userData = validation.id(req.params.id);
    if (!userData) res.status(404).json({ error: 'User not found' });
    const data = users.indexOf(userData);
    users.splice(data, 1);
    return res.status(204).json({ 
      message: 'User has been deleted' });
  }
}

export default UserController;
