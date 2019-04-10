import bcrypt from 'bcrypt';
import users from '../model/user';
import validation from './validator';

const salt = bcrypt.genSaltSync(10);

class UserController {

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
    return res.status(200).json({ 
      status: 200,
      data: user });
  };
}

export default UserController;
