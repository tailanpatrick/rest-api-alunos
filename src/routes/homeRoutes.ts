import { Router } from 'express';
import homeController from '../controllers/HomeController';

const homeRoutes: Router = Router();

homeRoutes.get('/', homeController.index)

export { homeRoutes };
