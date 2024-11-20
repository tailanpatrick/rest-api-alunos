import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const userRoutes: Router = Router();

userRoutes.post('/', userController.create);
userRoutes.get('/', loginRequired, userController.index);
userRoutes.get('/id/:id', userController.showById);
userRoutes.get('/email/:email', userController.showByEmail);
userRoutes.put('/:id', userController.update);
userRoutes.delete('/:id', userController.delete);

export { userRoutes };
