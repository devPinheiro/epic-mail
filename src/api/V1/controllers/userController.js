/* eslint-disable indent */
import sendGrid from '@sendgrid/mail';
import multer from 'multer';
import fs from 'fs';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import db from '../models/index';
import service from '../helper/service';
import validate from '../helper/validator';
import queryBuilder from '../helper/queryBuilder';

dotenv.config();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

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
    // sanitize user email
    const email = req.body.email.toLowerCase();

    // check if user exists
    const { user } = await queryBuilder.checkUser(email);
    if (user) {
      return res.status(409).json({
        status: 409,
        error: 'user already exists',
      });
    }

    try {
      const STANDARD_ROLE = 'member';
      // encrypt user password
      const encryptedPassword = service.encryptPassword(req.body.password);
      // persist user to db
      const persistUserString = `INSERT INTO 
                                     users (email, first_name, last_name, image, password, role) 
                                     VALUES ($1, $2, $3, $4, $5, $6) 
                                     returning *`;
      const values = [
        email,
        req.body.firstName,
        req.body.lastName,
        'https://lorempixel.com/200/200/people/',
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
    // sanitize user email
    const email = req.body.email.toLowerCase();

    try {
      // check if user exists
      const queryString = 'SELECT * FROM users WHERE email = $1';
      const { rows } = await db.query(queryString, [email]);
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
          error: 'invalid credentials',
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

    // sanitize user email
    const email = req.body.email.toLowerCase();

    // check if user exists
    const { user } = await queryBuilder.checkUser(email);
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
    // use sendgrid
    sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: req.body.email,
      from: 'pinheirolaoluwa@gmail.com',
      subject: 'Confirm Password Reset',
      html: `<strong>You are one step away from reseting your password</strong>
             click the link below 
             
             ${message}       
      `,
      text: `You are one step away from reseting your password
             click the link below 
             
             ${message}       
      `,
    };
    sendGrid.send(msg);

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
          error: 'invalid credentials',
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


  static upload(req, res) {
    // update user profile
     try {
      let avatar;
        const upload = multer({ storage }).single('avatar');
        upload(req, res, (err) => {
          if (err) {
            return res.send(err);
          }

          cloudinary.config({
          cloud_name: process.env.CLOUDINARY_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        const { path } = req.file;
        const fileName = new Date().toISOString();
        cloudinary.v2.uploader.upload(path, { public_id: `epic/${fileName}`, tags: 'epic' }, async (errr, image) => {
            if (errr) {
              res.send(errr);
            }
            // remove file from server
            fs.unlinkSync(path);
            // get image url
            avatar = image.secure_url;

          // persist user to db
          const updateString = `UPDATE  users 
                                        SET image = $1
                                        WHERE id = $2
                                        returning *`;
          const values = [
            avatar,
            req.user.id,
          ];
          await db.query(updateString, values);
          return res.status(201).json({
            status: 201,
            data: 'profile image uploaded successfully',
          });
        });
    });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: 'internal server error',
      });
    }
  }
}

export default UserController;
