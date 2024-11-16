import { Router } from 'express';
import userController from '../controllers/UserController';

const userRoutes: Router = Router();

userRoutes.post('/', userController.create);
userRoutes.get('/', userController.index);
userRoutes.get('/:id', userController.show);
userRoutes.put('/:id', userController.update);
userRoutes.delete('/:id', userController.delete);

export { userRoutes };
