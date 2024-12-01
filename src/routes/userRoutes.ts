import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const userRoutes: Router = Router();

//TODO: Remover essas rotas na versão final
userRoutes.get('/', loginRequired, userController.index);
userRoutes.get('/id/:userId', userController.showById);
userRoutes.get('/email/:email', userController.showByEmail);

userRoutes.post('/', userController.create);
userRoutes.put('/', loginRequired, userController.update);
userRoutes.delete('/', loginRequired, userController.delete);

export { userRoutes };
