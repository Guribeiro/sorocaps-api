import 'reflect-metadata';

import express, {Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import databse from '../infra/sequelize';

import '../container';
import routes from './routes';

import AppError from '@shared/errors/AppError';

const PORT = 3000;

const app = express();

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

app.listen(PORT, async () => {
  await databse.sync();
  console.log(`server is running at port ${PORT}`)
});
