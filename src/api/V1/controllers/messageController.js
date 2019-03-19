import uuid from 'uuid';
import message from '../models/messageModel';

class MessageController {
  static composeMessage(req, res) {
    const today = new Date();

    // empty object to store created messages
    const newMessage = {};

    // validate user input
    if (req.body.subject !== '' && req.body.message !== '' && typeof req.body.subject === 'string') {
      // set message entry object properties with values
      newMessage.id = uuid();
      newMessage.createdOn = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      newMessage.subject = req.body.subject;
      newMessage.message = req.body.message;
      newMessage.parentMessageId = req.body.parentMessageId;
      newMessage.status = 'sent';

      // push to mock db
      message.push(newMessage);

      // send response to clientside
      return res.status(201).json({
        status: 201,
        data: newMessage,
      });
    }
    // send response to clientside
    return res.status(400).json({
      status: 400,
      error: 'enter valid input',
    });
  }

  static getAllMessages(req, res) {
    if (message.length !== 0) {
      const receivedMessage = message.filter(msg => msg.status !== 'sent' && msg.status !== 'draft');
      // send response to clientside
      return res.status(200).json({
        status: 200,
        data: receivedMessage,
      });
    }
    // send response to clientside
    return res.status(404).json({
      status: 404,
      error: 'no messages found',
    });
  }

  static getOneMessage(req, res) {
    // get message id
    const { id } = req.params;

    // fetch message using id
    const singleMessage = message.find(msg => msg.id == id);

    // if message does not exists
    if (!singleMessage) {
      // send response to clientside
      return res.status(404).json({
        status: 404,
        error: 'message does not exist',
      });
    }

    // send response to clientside
    return res.status(200).json({
      status: 200,
      data: singleMessage,
    });
  }

  static deleteMessage(req, res) {
    // get message id
    const { id } = req.params;
    // fetch message using id
    const singleMessage = message.find(msg => msg.id == id);

    if (singleMessage) {
      message.map((msg, index) => {
        if (msg.id === id) {
          // remove from db
          message.splice(index, 1);
        }
      });
      // send response to clientside
      return res.status(204).send({
        status: 204,
        data: [],
      });
    }
    // send response to clientside
    return res.status(404).json({
      status: 404,
      error: 'message does not exist',
    });
  }

  static unreadMessage(req, res) {
    if (message.length !== 0) {
      // get only unread messages
      const unread = message.filter(msg => msg.status === 'unread');

      if (unread) {
        // send response to clientside
        return res.status(200).json({
          status: 200,
          data: unread,
        });
      }
    }
    // send response to clientside
    return res.status(404).json({
      status: 404,
      error: 'no unread messages found',
    });
  }

  static sentMessage(req, res) {
    if (message.length !== 0) {
      // get only sent messages
      const sent = message.filter(msg => msg.status === 'sent');

      if (sent) {
      // send response to clientside
        return res.status(200).json({
          status: 200,
          data: sent,
        });
      }
    }
    // send response to clientside
    return res.status(404).json({
      status: 404,
      error: 'no sent messages found',
    });
  }
}

export default MessageController;
