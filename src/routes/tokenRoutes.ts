import { Router } from 'express';
import tokenController from '../controllers/TokenController';

const tokenRoutes: Router = Router();

tokenRoutes.post('/', tokenController.create)

export { tokenRoutes };
