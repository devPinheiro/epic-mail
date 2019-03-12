import express from 'express';
import MessageController from '../controllers/messageController';

const messageRoute = express.Router();
messageRoute.post('/messages', MessageController.composeMessage);
messageRoute.get('/messages', MessageController.getAllMessages);
messageRoute.get('/messages/unread', MessageController.unreadMessage);
messageRoute.get('/messages/sent', MessageController.sentMessage);
messageRoute.get('/messages/:id', MessageController.getOneMessage);
messageRoute.delete('/messages/:id', MessageController.deleteMessage);

export default messageRoute;
