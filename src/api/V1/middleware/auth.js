import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models/index';

dotenv.config();

export default {
  async verifyToken(req, res, next) {
    // get token
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).json({
        status: 401,
        error: 'not authorized',
      });
    }
    try {
      const decode = await jwt.verify(token, process.env.SECRET);
      if (!decode) {
        return res.status(500).json({
          status: 500,
          error: 'failed to authenticate token',
        });
      }
      // find user with token
      const queryString = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(queryString, [decode.userId]);
      if (!rows[0]) {
        return res.status(400).json({
          status: 400,
          error: 'invalid token provided',
        });
      }
      req.user = { id: decode.userId };
      next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'token has expired',
      });
    }
  },
};
