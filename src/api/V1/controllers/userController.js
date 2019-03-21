import moment from 'moment';
import db from '../models/index';
import service from '../helper/service';
import validate from '../helper/validator';
import queryBuilder from '../helper/queryBuilder';

class UserController {
  static async signup(req, res) {
    /**
     * 1. validate user input using Validator
     * 2. query db to check if user exists
     * 3. persist user data if successfull
     *
     *  */
    // validate user input
    const { success, error } = validate.signupValidate(req.body);
    if (!success) {
      // return errors
      return res.status(400).json({
        status: 400,
        error,
      });
    }
    // check if user exists
    const { user } = await queryBuilder.checkUser(req.body.email);
    if (user) {
      return res.status(400).json({
        status: 400,
        error: 'user already exists',
      });
    }

    try {
      const STANDARD_ROLE = 'member';
      // encrypt user password
      const encryptedPassword = service.encryptPassword(req.body.password);
      // persist user to db
      const persistUserString = `INSERT INTO 
                                     users (email, first_name, last_name, password, role) 
                                     VALUES ($1, $2, $3, $4, $5) 
                                     returning *`;
      const values = [
        req.body.email,
        req.body.firstName,
        req.body.lastName,
        encryptedPassword,
        req.body.role || STANDARD_ROLE,
      ];
      const { rows } = await db.query(persistUserString, values);
      const token = service.generateToken(rows[0].id);

      return res.status(201).json({
        status: 201,
        data: token,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: 'internal server error',
      });
    }
  }

  static async login(req, res) {
    /**
     * 1. validate user input using Validator
     * 2. query db to check if user exists
     * 3. generate token for user
     *
     *  */
    // validate user input
    const { success, error } = validate.loginValidate(req.body);
    if (!success) {
      // return errors
      return res.status(400).json({
        status: 400,
        error,
      });
    }

    try {
      // check if user exists
      const queryString = 'SELECT * FROM users WHERE email = $1';
      const { rows } = await db.query(queryString, [req.body.email]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'user does not exists',
        });
      }
      // compare user password
      if (!service.comparePassword(req.body.password, rows[0].password)) {
        return res.status(400).json({
          status: 400,
          error: 'You have entered an incorrect password',
        });
      }
      // genrate token for user
      const token = service.generateToken(rows[0].id);
      return res.status(200).json({
        status: 200,
        data: token,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: 'internal server error',
      });
    }
  }

  static async reset(req, res) {
    /** *
     * 1. verify user identity
     * 2. reset user password
     * 3. send user a mail
     *  */
    // validate user input
    const { success, error } = validate.resetValidate(req.body);
    if (!success) {
      // return errors
      return res.status(400).json({
        status: 400,
        error,
      });
    }
    // check if user exists
    const { user } = await queryBuilder.checkUser(req.body.email);
    if (!user) {
      return res.status(404).json({
        status: 404,
        error: 'user does not exists, try signing up first',
      });
    }
    // generate new password for user
    const newPassword = (Math.random() * 1000).toString(32).substr(3, 8).toUpperCase();
    // encrypt user password
    const encryptedPassword = service.encryptPassword(newPassword);
    // update user password
    const queryString = `UPDATE users 
                                     SET  password = $1 
                                     WHERE id = $2
                                     returning *`;
    const values = [
      encryptedPassword,
      user.id,
    ];
    const { rows } = await db.query(queryString, values);
    // send user mail
    const message = `https://epic-mail-devp.herokuapp.com/api/v1/auth/confirmReset/${rows[0].email}&${newPassword}`;
    const insertMessageString = `INSERT INTO
                           messages(subject, message, parent_message_id, status, created_on)
                           VALUES($1, $2, $3, $4, $5) 
                           returning *`;

    const messageValues = [
      'Password Reset',
      message,
      1,
      'sent',
      moment(new Date()),
    ];
    const { msgs } = await queryBuilder.sendResetLink(insertMessageString, messageValues);
    const msgId = msgs.id;
    // insert into inbox
    const inboxValues = [
      msgId,
      user.id,
      0,
      'unread',
    ];

    // insert into inbox table
    const { insertBox } = await queryBuilder.insertInbox(inboxValues);
    if (!insertBox) {
      return res.status(400).json({
        status: 400,
        error: 'wrong credentials',
      });
    }
    return res.status(200).json({
      status: 200,
      data: {
        message: 'check your email for password reset link',
        email: rows[0].email,
      },
    }); 
  }

  static async confirmReset(req, res) {
    try {
      // check if user exists
      const queryString = 'SELECT * FROM users WHERE email = $1';
      const { rows } = await db.query(queryString, [req.params.email]);
      if (!rows[0]) {
        return res.status(400).json({
          status: 400,
          error: 'user does not exists',
        });
      }
      // compare user password
      if (!service.comparePassword(req.params.password, rows[0].password)) {
        return res.status(400).json({
          status: 400,
          error: 'Your reset password is incorrect',
        });
      }
      // genrate token for user
      const token = service.generateToken(rows[0].id);
      return res.status(200).json({
        status: 200,
        data: token,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        data: 'invalid credentials, contact administrator',
      });
    }
  }
}

export default UserController;
