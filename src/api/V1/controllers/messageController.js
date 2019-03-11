import message from '../models/messageModel';

class MessageController {
  static composeMessage(req, res) {
    const today = new Date();

    // empty object to store created messages
    const newMessage = {};

    // validate user input
    if (req.body.subject !== '' && req.body.message !== '' && typeof req.body.subject === 'string') {
      // set message entry object properties with values
      newMessage.id = message.length + 1;
      newMessage.createdOn = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      newMessage.subject = req.body.subject;
      newMessage.message = req.body.message;
      newMessage.parentMessageId = req.body.parentMessageId;
      newMessage.status = req.body.status;

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
      // send response to clientside
      return res.status(200).json({
        status: 200,
        data: message,
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
    const oneMessage = message.find(msg => msg.id == id);

    // if message does not exists
    if (oneMessage) {
      // remove from db
      message.splice(id, 1);

      // send response to clientside
      return res.status(200).json({
        status: 200,
        data: {
          message: 'messsage deleted successfully',
        },
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

      // send response to clientside
      return res.status(200).json({
        status: 200,
        data: unread,
      });
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

      // send response to clientside
      return res.status(200).json({
        status: 200,
        data: sent,
      });
    }
    // send response to clientside
    return res.status(404).json({
      status: 404,
      error: 'no sent messages found',
    });
  }
}

export default MessageController;