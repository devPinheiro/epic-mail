import express from 'express';
import GroupController from '../controllers/groupController';
import auth from '../middleware/auth';

const groupRoute = express.Router();
groupRoute.post('/', auth.verifyToken, GroupController.create);
groupRoute.get('/', auth.verifyToken, GroupController.getAllGroups);
groupRoute.delete('/:id', auth.verifyToken, GroupController.deleteGroup);
export default groupRoute;
