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

  // Implement async method for all groups
  static async getAllGroups(req, res) {
    /**
     *
     * @param {*} req
     * @param {*} res
     *
     */

    try {
      const { allGroups } = await queryBuilder.fetchAllGroups(req.user.id);
      if (allGroups) {
        return res.status(200).json({
          status: 200,
          data: allGroups,
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'no groups found for this user',
      });
    } catch (error) {
      // send response to clientside
      return res.status(500).json({
        status: 500,
        error: 'server internal error',
      });
    }
  }

  // Implement async method for delete group
  static async deleteGroup(req, res) {
    // validate user input
    const { id } = req.params;
    const { success, error } = validator.paramsValidate(id);
    if (!success) {
      // return errors
      return res.status(400).json({
        status: 400,
        error,
      });
    }
    try {
      const { deleteGroup } = await queryBuilder.deleteGroup(id, req.user.id);
      if (deleteGroup) {
        return res.status(200).json({
          status: 200,
          data: {
            message: 'group deleted successfully',
          },
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'no group found with id for this user',
      });
    } catch (err) {
      // send response to clientside
      return res.status(500).json({
        status: 500,
        error: 'server internal error',
      });
    }
  }

  // Implement async method for update group
  static async updateGroup(req, res) {
    // validate user input
    const { name } = req.body;
    const { groupId } = req.params;
    const values = [name, req.params.name];

    const groupIdn = groupId.trim();

    const { success, error } = validator.groupParamsValidate(values, groupIdn);
    if (!success) {
      // return errors
      return res.status(400).json({
        status: 400,
        error,
      });
    }
    const { group } = await queryBuilder.checkGroup(values, req.user.id);
    if (!group) {
      // return errors
      return res.status(400).json({
        status: 400,
        error: 'group can only be modified by group owner',
      });
    }
    try {
      const { updatedGroup } = await queryBuilder.updateGroup(values, groupIdn, req.user.id);
      if (updatedGroup) {
        return res.status(200).json({
          status: 200,
          data: updatedGroup,
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'no group found for this user',
      });
    } catch (err) {
      // send response to clientside
      return res.status(500).json({
        status: 500,
        error: 'server internal error',
      });
    }
  }

   // Implement add user to group
  static async addUserToGroup(req, res) {
    /**
     * check if user exists
     */
    const { groupId } = req.params;

    const groupIdn = groupId.trim();
    const { success, error } = validator.resetValidate(req.body);
    if (!success) {
      // return errors
      return res.status(400).json({
        status: 400,
        error,
      });
    }
    const { group } = await queryBuilder.checkGroupExists(groupIdn);
    if (!group) {
      return res.status(404).json({
        status: 404,
        error: 'group does not exists',
      });
    }
    const { user } = await queryBuilder.checkUser(req.body.email);
    if (!user) {
      return res.status(404).json({
        status: 404,
        error: 'user does not exists',
      });
    }
    // if user already exists in db
    const { alUser } = await queryBuilder.checkUserExistGroup(user.id, groupIdn);
    if (alUser) {
      return res.status(400).json({
        status: 400,
        error: 'user already exist in group',
      });
    }
    try {
      const { addUser } = await queryBuilder.insertUserGroup(user, groupIdn);
      if (!addUser) {
        return res.status(400).json({
          status: 400,
          error: 'user can not be added to this group',
        });
      }
      return res.status(201).json({
        status: 201,
        data: addUser,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: 'internal server error',
      });
    }
  }

}

export default GroupController;