import jwt from 'jsonwebtoken';

class Authorization {

  static checkToken(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).json({
        status: 401,
        message: 'Authorization failed',
      });
    }
  
  }

}

export default Authorization;
