import 'reflect-metadata';
import {config} from 'dotenv';
import express, {Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import cors from 'cors'
import databse from '../infra/sequelize';
import '@shared/infra/typeorm';

import '../container';
import routes from './routes';

import AppError from '@shared/errors/AppError';

const port = process.env.PORT || 3333;

config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use((err: Error, request: Request, response: Response, next:NextFunction) => {
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      message: err.message
    });
  }

    return response.status(500).json({
      message: `Internal server error - ${err.message}`
    });
  }
);

app.listen(port, async () => {
  await databse.sync();
  console.log(`server is running at port ${port}`)
});
