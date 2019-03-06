import express from 'express';
import messageController from './message.controller';

export const messageRouter = express.Router();
messageRouter.post('/', messageController.compose);
messageRouter.get('/', messageController.allMessages);