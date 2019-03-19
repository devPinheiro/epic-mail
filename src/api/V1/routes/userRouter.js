import express from 'express';
import userController from '../controllers/userController';

const userRoute = express.Router();

userRoute.post('/auth/signup', userController.signup);
userRoute.post('/auth/login', userController.login);

export default userRoute;
