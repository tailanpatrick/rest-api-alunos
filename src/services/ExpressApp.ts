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

    // Configuração CORS
    const allowedOrigins = [
      'http://localhost:3001',
      'https://front-end-alunos.vercel.app'
    ];

    this.app.use(cors({
      origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true); // Permite a requisição
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    }));
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
