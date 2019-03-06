import express from 'express';
import { userRouter } from './user';
import { messageRouter } from './messages';
import { sentRouter } from './sent';
import { inboxRouter } from './inbox';


export const apiRouter = express.Router();

// user route
apiRouter.use('/auth', userRouter);
//messages route
apiRouter.use('/messages', messageRouter);
apiRouter.use('/messages/sent', sentRouter);
apiRouter.use('/messages', inboxRouter);
