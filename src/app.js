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

const allowlist = ['http://35.247.231.243', 'http://localhost:3000'];
const corsOptionsDelegate = function (origin, callback) {
  let corsOptions;
  if (allowlist.indexOf(origin.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // Refletir (habilitar) a origem solicitada na resposta CORS
  } else {
    corsOptions = { origin: false }; // Desabilitar CORS para este pedido
  }
  callback(null, corsOptions); // Callback espera dois parâmetros: erro e opções
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
