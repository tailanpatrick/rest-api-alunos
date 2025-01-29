import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';

import photoController from '../controllers/PhotoController';


const photoRoutes: Router = Router();

photoRoutes.post('/',loginRequired , photoController.create)

export { photoRoutes };
