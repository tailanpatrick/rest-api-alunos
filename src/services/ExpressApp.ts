import { App }  from '../interfaces/App';
import express, { Application } from 'express'
import { homeRoutes } from "../routes/homeRoutes";

class ExpressApp implements App{
  app: Application;

  constructor(){
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());

  }

  routes(){
    this.app.use(homeRoutes)
  }


}

export default new ExpressApp().app ;
