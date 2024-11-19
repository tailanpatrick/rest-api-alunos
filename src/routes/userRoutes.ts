import { Router } from 'express';
import userController from '../controllers/UserController';

const userRoutes: Router = Router();

userRoutes.post('/', userController.create);
userRoutes.get('/', userController.index);
userRoutes.get('/id/:id', userController.showById);
userRoutes.get('/email/:email', userController.showByEmail);
userRoutes.put('/:id', userController.update);
userRoutes.delete('/:id', userController.delete);

export { userRoutes };
