import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../model/database';
import Model from '../model/Model';


dotenv.config();

const salt = bcrypt.genSaltSync(10);

class UserController {
  static async signUp(req, res) {
    try {
      const user = {
        email: req.body.email,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        password: bcrypt.hashSync(req.body.password, salt),
        type: req.body.type,
        isAdmin: req.body.isAdmin,
      };
      const table = new Model();
      const query = `INSERT INTO users( email, firstname, lastname, password, type, isAdmin)
    VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
      const values = Object.values(user);
      const response = await table.query(query, values);

      const { ...userData } = response.rows[0];
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
    } catch (e) {
      return res.status(400).json({
        status: 400,
        error: e,
      });
    }
  }

  static async signIn(req, res) {
    try {
      const query = 'SELECT * FROM users  WHERE email = $1';
      const table = new Model();
      const values = [req.body.email];
      const user = await table.query(query, values);
      if (user.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Email address does not exist',
        });
      }
      const compare = bcrypt.compareSync(req.body.password, user.rows[0].password);
      if (compare === false) {
        return res.status(404).json({
          status: 404,
          error: 'Incorrect Password',
        });
      }
      const userData = user.rows[0];
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
    } catch (e) {
      return res.status(400).json({
        status: 400,
        error: e,
      });
    }
  }

  static getAccounts(req, res) {
    if (req.userData.isAdmin !== true) {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized token for this session',
      });
    }
    pool.query('SELECT * FROM accounts WHERE owneremail = $1', [req.params.email], (err, result) => {
      if (result.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'No account records',
        });
      }
      const accountRows = result.rows;
      return res.status(200).json({
        status: 200,
        accounts: accountRows,
      });
    });
  }
}

export default UserController;
