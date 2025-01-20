import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const userRoutes: Router = Router();

//TODO: Remover essas rotas na versão final
//userRoutes.get('/', userController.index);
// userRoutes.get('/id/:userId', loginRequired, userController.showById);
// userRoutes.get('/email/:email', loginRequired, userController.showByEmail);

userRoutes.post('/', userController.create);
userRoutes.put('/:userId', loginRequired, userController.update);
userRoutes.delete('/:userId', loginRequired, userController.delete);

export { userRoutes };
