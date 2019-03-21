import moment from 'moment';
import db from '../models/index';
import validator from '../helper/validator';
import queryBuilder from '../helper/queryBuilder';


class GroupController {
  static async create(req, res) {
    /**
         *
         * @param {*} req
         * @param {*} res
         *
         */

    // validate user input
    const {
      success,
      error,
    } = validator.groupNameValidate(req.body.name);
    if (!success) {
      // return errors
      return res.status(400).json({
        status: 400,
        error,
      });
    }
    try {
      const { user } = await queryBuilder.userDetails(req.user.id);
      // Insert into db
      if (user) {
        const queryString = `INSERT INTO
                           groups(name, role, owner_id)
                           VALUES($1, $2, $3) 
                           returning *`;

        const groupValues = [
          req.body.name,
          'admin',
          user.id,
        ];

        const { rows } = await db.query(queryString, groupValues);
        return res.status(201).json({
          status: 201,
          data: rows[0],
        });
      }
      // return errors
      return res.status(404).json({
        status: 404,
        error: 'user does not exist',
      });
    } catch (err) {
      // send response to clientside
      return res.status(500).json({
        status: 500,
        error: 'server internal error',
      });
    }
  }
}

export default GroupController;