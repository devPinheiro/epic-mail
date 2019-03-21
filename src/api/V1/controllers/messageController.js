import moment from 'moment';
import db from '../models/index';
import validator from '../helper/validator';
import queryBuilder from '../helper/queryBuilder';


class MessageController {
  // Implement async func for create method
  static async composeMessage(req, res) {
    /**
     *
     * @param {*} req
     * @param {*} res
     *
     * 1. query receiver id using his/her mail
     * 2. if user exists, insert first into message table
     *    then insert also into inbox of thr receiver
     *    then insert into sent table of the receiver
     */

    // validate user input
    const { success, error } = validator.messageValidate(req.body);
    if (!success) {
      // return errors
      return res.status(400).json({
        status: 400,
        error,
      });
    }
    if (req.body.draft === 'draft') {
      // Insert into db
      const insertMsgString = `INSERT INTO
                           messages(subject, message, parent_message_id, status, created_on)
                           VALUES($1, $2, $3, $4, $5) 
                           returning *`;

      const msgValues = [
        req.body.subject,
        req.body.message,
        1,
        'sent',
        moment(new Date()),
      ];

      const { rows } = await db.query(insertMsgString, msgValues);
      return res.status(201).json({
        status: 201,
        data: rows[0],
      });
    }
    // let's try and catch for the async func in case the promise fail to resolve
    try {
    // fetch id of the receiver
      const receiverId = await queryBuilder.receiverId(req.body.email);
      if (receiverId) {
        // Insert into db
        const insertMessageString = `INSERT INTO
                           messages(subject, message, parent_message_id, status, created_on)
                           VALUES($1, $2, $3, $4, $5) 
                           returning *`;

        const messageValues = [
          req.body.subject,
          req.body.message,
          1,
          'sent',
          moment(new Date()),
        ];

        const { rows } = await db.query(insertMessageString, messageValues);
        const msgId = rows[0].id;

        // insert into inbox
        const inboxValues = [
          msgId,
          receiverId,
          0,
          'unread',
        ];

        // insert into inbox table
        const { insertBox } = await queryBuilder.insertInbox(inboxValues);

        // fetch id of the sender
        const senderId = await queryBuilder.senderId(req.user.id);
        const sentValues = [
          msgId,
          senderId,
          0,
        ];
        // insert into sent tables
        const { sentBox } = await queryBuilder.insertSent(sentValues);
        if (insertBox && sentBox) {
          // send response to clientside
          return res.status(201).json({
            status: 201,
            data: rows[0],
          });
        }
      }
      // return errors
      return res.status(400).json({
        status: 400,
        error: 'receiver does not exist',
      });

      // catch any error if promise fail to resolve
    } catch (err) {
      // send response to clientside
      return res.status(500).json({
        status: 500,
        error: 'server internal error',
      });
    }
  }

  // Implement async method for received all mails
  static async getInboxMessage(req, res) {
    /**
      *
      * @param {*} req
      * @param {*} res
      *
      */

    try {
      const { allInbox } = await queryBuilder.fetchAllInbox(req.user.id);
      if (allInbox) {
        return res.status(200).json({
          status: 200,
          data: allInbox,
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'no messages found',
      });
    } catch (error) {
      // send response to clientside
      return res.status(500).json({
        status: 500,
        error: 'server internal error',
      });
    }
  }

  // Implement async method for all unread mails
  static async getUnreadMessage(req, res) {
    /**
     *
     * @param {*} req
     * @param {*} res
     *
     */

    try {
      const { allUnread } = await queryBuilder.fetchAllUnread(req.user.id);
      if (allUnread) {
        return res.status(200).json({
          status: 200,
          data: allUnread,
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'no messages found',
      });
    } catch (error) {
      // send response to clientside
      return res.status(500).json({
        status: 500,
        error: 'server internal error',
      });
    }
  }


  // Implement async method for all sent mails
  static async getSentMessage(req, res) {
    /**
     *
     * @param {*} req
     * @param {*} res
     *
     */

    try {
      const { allSent } = await queryBuilder.fetchAllSent(req.user.id);
      if (allSent) {
        return res.status(200).json({
          status: 200,
          data: allSent,
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'no messages found',
      });
    } catch (error) {
      // send response to clientside
      return res.status(500).json({
        status: 500,
        error: 'server internal error',
      });
    }
  }

  // Implement async method for fetching one mail
  static async getOneMessage(req, res) {
    /**
     *
     * @param {*} req
     * @param {*} res
     *
     */
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
      // update this message to read'
      const read = await queryBuilder.updateReadMessage(id);
      // fetch message
      const { singleMessage } = await queryBuilder.fetchOneMessage(id, req.user.id);
      if (singleMessage && read) {
        return res.status(200).json({
          status: 200,
          data: singleMessage,
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'message does not exist',
      });
    } catch (err) {
      // send response to clientside
      return res.status(500).json({
        status: 500,
        error: 'server internal error',
      });
    }
  }

  // Implement async method for all deleting a mail
  static async deleteMessage(req, res) {
    /**
      *
      * @param {*} req
      * @param {*} res
      *
      */
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
      // set this message to delete = true
      const { singleMessage } = await queryBuilder.deleteInboxMessage(id);
      // fetch message
      if (singleMessage) {
        return res.status(200).json({
          status: 200,
          data: {
            message: 'message deleted successfuly',
          },
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'message does not exist',
      });
    } catch (err) {
      // send response to clientside
      return res.status(500).json({
        status: 500,
        error: 'server internal error',
      });
    }
  }

  // Implement async method for retracting a mail
  static async retractMessage(req, res) {
    /**
      *
      * @param {*} req
      * @param {*} res
      *
      */
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
      // set this message to delete = true
      const { singleMessage } = await queryBuilder.deleteSentMessage(id);
      // fetch message
      if (singleMessage) {
        return res.status(204).json({
          status: 204,
          data: {
            message: 'message deleted successfuly',
          },
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'message does not exist',
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
export default MessageController;
