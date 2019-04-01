import express from 'express';
import MessageController from '../controllers/messageController';
import auth from '../middleware/auth';

const messageRoute = express.Router();
messageRoute.post('/', auth.verifyToken, MessageController.composeMessage);
messageRoute.get('/', auth.verifyToken, MessageController.getInboxMessage);
messageRoute.get('/unread', auth.verifyToken, MessageController.getUnreadMessage);
messageRoute.get('/sent', auth.verifyToken, MessageController.getSentMessage);
messageRoute.get('/draft', auth.verifyToken, MessageController.getDraftMessage);
messageRoute.get('/:id', auth.verifyToken, MessageController.getOneMessage);
messageRoute.delete('/:id', auth.verifyToken, MessageController.deleteMessage);
messageRoute.delete('/retract/:id', auth.verifyToken, MessageController.retractMessage);

export default messageRoute;
