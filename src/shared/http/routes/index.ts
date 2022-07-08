import {Router} from 'express';
import usersRouter from '@modules/users/infra/routes';
import customersRouter from '@modules/customers/routes';
import sessionRouter from '@modules/users/infra/routes/session.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/session', sessionRouter);
routes.use('/customers', customersRouter);

export default routes;
