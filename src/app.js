import { resolve } from 'path';

import './database';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/UserRoutes';
import tokenRoutes from './routes/TokenRoutes';
import alunoRoutes from './routes/alunoRoutes';
import fotoRoutes from './routes/fotoRoutes';

const allowlist = ['35.247.231.243', 'http://localhost:3001'];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header('origin')) !== -1) {
    corsOptions = { origin: true }; // refletir (habilitar) a origem solicitada na resposta CORS
  } else {
    corsOptions = { origin: false }; // desativar CORS para esta solicitação
  }
  callback(null, corsOptions); // callback espera dois parâmetros: erro e opções
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptionsDelegate));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/alunos/', alunoRoutes);
    this.app.use('/fotos/', fotoRoutes);
  }
}

export default new App().app;
