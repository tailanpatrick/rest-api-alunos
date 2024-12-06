import { App }  from '../interfaces/App';
import express, { Application } from 'express'
import { homeRoutes } from "../routes/homeRoutes";
import { userRoutes } from "../routes/userRoutes";
import { tokenRoutes } from '../routes/tokenRoutes';
import { studentRoutes } from '../routes/studentRoutes';
import { photoRoutes } from '../routes/photoRoutes';
import { resolve} from 'path';


class ExpressApp implements App {
  app: Application;

  constructor(){
    this.app = express();
    this.middlewares();
    this.routes();

  }

  middlewares(){
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use('/static/images', express.static(resolve(__dirname, '..', '..', 'uploads', 'images')));
    
  }

  routes(){
    this.app.use(homeRoutes)
    this.app.use('/users/', userRoutes)
    this.app.use('/tokens/', tokenRoutes)
    this.app.use('/students/', studentRoutes)
    this.app.use('/photos/', photoRoutes)
    
  }


}

export default new ExpressApp().app ;
