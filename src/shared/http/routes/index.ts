import {Router} from 'express';
import usersRouter from '@modules/users/http/routes';
import customersRouter from '@modules/customers/http/routes';
import sessionRouter from '@modules/users/http/routes/session.routes';
import productsRouter from '@modules/products/http/routes';
import ordersRouter from '@modules/orders/http/routes';
import stocksRouter from '@modules/stocks/http/routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/customers', customersRouter);
routes.use('/products', productsRouter);
routes.use('/orders', ordersRouter);
routes.use('/stocks', stocksRouter);

export default routes;
