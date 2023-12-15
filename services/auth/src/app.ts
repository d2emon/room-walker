import express from 'express';

import cors from 'cors';
import Debug from 'debug';
import helmet from 'helmet';
import morgan from 'morgan';
// import path from 'path';

import db from './db/mongo'; //
// import config from './config'; //
import * as middlewares from './middlewares';

import userRouter from './routes/user';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  Debug('auth:db')('MongoDB connected');
});

app.use('/api/v1.0/user', userRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
