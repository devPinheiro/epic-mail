import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default {
  /**
   * @param  plainText
   */
  encryptPassword(plainText) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainText, salt);
  },
  /**
   * @param  plainText
   * @param  encryptedPassword
   */
  comparePassword(plainText, encryptedPassword) {
    return bcrypt.compareSync(plainText, encryptedPassword);
  },
  generateToken(payload) {
    return {
      token: jwt.sign(
        { userId: payload },
        process.env.SECRET,
        {
          expiresIn: '7d',
        },
      ),
    };
  },
};
