import express from 'express';
import { userRouter } from './user';


export const apiRouter = express.Router();

// user route
apiRouter.use('/auth', userRouter);
