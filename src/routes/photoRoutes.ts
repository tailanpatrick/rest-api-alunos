import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';
import path from 'path';
import fs from 'fs';


import photoController from '../controllers/PhotoController';


const photoRoutes: Router = Router();

photoRoutes.post('/',loginRequired , photoController.create);


photoRoutes.delete('/:photo_id', loginRequired, photoController.delete);

export { photoRoutes };
