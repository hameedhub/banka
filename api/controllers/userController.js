import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import users from '../model/user';
import validation from './validator';

dotenv.config();

const salt = bcrypt.genSaltSync(10);

class UserController {

  static signUp(req, res) {
    const result = validation.details(req.body);
    if (result.error) return res.status(404).json({ error: result.error.details[0].message });
    const userEmail = users.find(user => user.email === req.body.email);
    if (userEmail) return res.json({ error: 'Email already in use' });
    const token = jwt.sign({
      id:users.length+1,
      email: req.body.email,
      type: req.body.type,
      isAdmin: req.body.isAdmin
    }, process.env.JWT_KEY,{expiresIn: '24h'});
    const user = {
      token,
      id: users.length + 1,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: bcrypt.hashSync(req.body.password, salt),
      type: req.body.type,
      isAdmin: req.body.isAdmin
    };
    users.push(user);
    return res.status(201).json({
      status: 201,
      data: {
        token: user.token,
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      }
    });
  }

  static signIn(req, res) {
    const userDetails = users.find(user => user.email === req.body.email);
    if (!userDetails) return res.status(404).json({ 
      status: 404,
      error: 'Incorrect email address'
    });
    const compare = bcrypt.compareSync(req.body.password, userDetails.password);
    if (compare === false) return res.status(404).json({ 
      status: 404,
      error: 'Incorrect Password'
    });
    const token = jwt.sign({
      id:users.length+1,
      email: userDetails.email,
      type: userDetails.type,
      isAdmin: userDetails.isAdmin
    }, process.env.JWT_KEY,{expiresIn: '24h'});
    return res.status(200).json({
      status: 200,
      data: {
        token,
        id: userDetails.id,
        firstname: userDetails.firstname,
        lastname: userDetails.lastname,
        email: userDetails.email
      }
    });
  }
}

export default UserController;
