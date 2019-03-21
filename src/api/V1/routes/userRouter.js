import express from 'express';
import UserController from '../controllers/userController';

const userRoute = express.Router();
userRoute.post('/signup', UserController.signup);
userRoute.post('/login', UserController.login);
userRoute.post('/reset', UserController.reset);
userRoute.get('/confirmReset/:email&:password', UserController.confirmReset);
export default userRoute;
