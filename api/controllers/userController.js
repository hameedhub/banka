import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import validation from './validator';
import check from '../helper/checkField';
import pool from '../model/database';


dotenv.config();

const salt = bcrypt.genSaltSync(10);

class UserController {

  static signUp(req, res) {
    const result = validation.details(req.body);
    if (result.error) return res.status(404).json({ status: 404, error: result.error.details[0].message });
    const user = {
      email: req.body.email,
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      password: bcrypt.hashSync(req.body.password, salt),
      type: req.body.type,
      isAdmin: req.body.isAdmin,
    };
    pool.connect((err, client, done) => {
      const query = `INSERT INTO users( email, firstname, lastname, password, type, isAdmin)
                      VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
      const values = Object.values(user);
      client.query(query, values, (err, data) => {
        done();
        if (err) {
          if (err.code === '23505') {
            return res.status(400).json({
              status: 400,
              error: 'Email already in use',
            });
          }
          return res.status(500).json({
            status: 400,
            error: err,
          });
        }
        const { ...userData } = data.rows[0];
        const token = jwt.sign({
          id: user.id,
          firstName: userData.firstname,
          lastName: userData.lastname,
          email: userData.email,
          type: userData.type,
          isAdmin: userData.isadmin,
        }, process.env.JWT_KEY);
        return res.status(201).json({
          status: 201,
          token,
          data: {
            id: userData.id,
            firstName: userData.firstname,
            lastName: userData.lastname,
            email: userData.email,
          },
        });
      });
    });
  }

  static signIn(req, res) { 
    pool.connect((err, client, done) => {
      const query = 'SELECT * FROM users  WHERE email = $1';
      client.query(query, [req.body.email], (err, data) => {
        done();
        if(data.rows.length === 0) return res.status(404).json({
          status: 404,
          error: 'Email address does not exist',
        });
        const userData = data.rows[0];
        const compare = bcrypt.compareSync(req.body.password, userData.password);
        if (compare === false) {
          return res.status(404).json({
            status: 404,
            error: 'Incorrect Password',
          });
        }
        const token = jwt.sign({
          id: userData.id,
          email: userData.email,
          firstname: userData.firstname,
          lastname: userData.lastname,
          type: userData.type,
          isAdmin: userData.isadmin,
        }, process.env.JWT_KEY, { expiresIn: '24h' });
        return res.status(200).json({
          status: 200,
          data: {
            token,
            id: userData.id,
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
          },
        });
        
      });
    });
    

  }

  static getAccounts(req, res) {
    if (req.userData.isAdmin !== true) {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized token for this session',
      });
    }
    pool.query('SELECT * FROM accounts WHERE owneremail = $1', [req.params.email], (err, result) => {
      if (result.rowCount === 0) {return res.status(404).json({
        status: 404,
        error: 'No account records',
      }); };
      const accountRows = result.rows;
      return res.status(200).json({
        status: 200,
        accounts: accountRows,
      });
    });
  }
}

export default UserController;
