import express from 'express';
import GroupController from '../controllers/groupController';
import auth from '../middleware/auth';

const groupRoute = express.Router();
groupRoute.post('/', auth.verifyToken, GroupController.create);
groupRoute.get('/', auth.verifyToken, GroupController.getAllGroups);
groupRoute.delete('/:id', auth.verifyToken, GroupController.deleteGroup);
groupRoute.get('/:id', auth.verifyToken, GroupController.getOneGroup);
groupRoute.patch('/:groupId', auth.verifyToken, GroupController.updateGroup);
groupRoute.post('/:groupId/users', auth.verifyToken, GroupController.addUserToGroup);
groupRoute.delete('/:groupId/users/:userId', auth.verifyToken, GroupController.deleteUserFromGroup);
groupRoute.post('/:groupId/messages', auth.verifyToken, GroupController.sendMessage);
export default groupRoute;
