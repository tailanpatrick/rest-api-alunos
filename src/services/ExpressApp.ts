import { App } from '../interfaces/App';
import express, { Application } from 'express'
const cors = require('cors');


import { homeRoutes } from "../routes/homeRoutes";
import { userRoutes } from "../routes/userRoutes";
import { tokenRoutes } from '../routes/tokenRoutes';
import { studentRoutes } from '../routes/studentRoutes';
import { photoRoutes } from '../routes/photoRoutes';
import { resolve } from 'path';


class ExpressApp implements App {
  app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();

  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use('/static/images', express.static(resolve(__dirname, '..', '..', 'uploads', 'images')));

    // Configuração CORS
    this.app.use(cors({
      origin: 'http://localhost:3001',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true, // Permitir cookies/sessões
    }));

    // Middleware para preflight
    this.app.options('*', (req, res) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
      res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.sendStatus(204); // Sem conteúdo
    });
  }


  routes() {
    this.app.use(homeRoutes)
    this.app.use('/users/', userRoutes)
    this.app.use('/tokens/', tokenRoutes)
    this.app.use('/students/', studentRoutes)
    this.app.use('/photos/', photoRoutes)

  }


}

export default new ExpressApp().app;
