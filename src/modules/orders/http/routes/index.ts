import {Router} from 'express';
import ensureAuthentication from '@modules/users/http/middlewares/ensureAuthentication';

import CreateSaleOrderController from '../useCase/CreateSaleOrder/CreateSaleOrderController';
import ListSaleOrdersController from '../useCase/ListSaleOrders/ListSaleOrdersController';
import ApproveSaleOrderController from '../useCase/ApproveSaleOrder/ApproveSaleOrderController';
import ListProductsOrderController from '../useCase/ListProductsOrder/ListProductsOrderController';

const ordersRouter = Router();

const createSaleOrderController = new CreateSaleOrderController();
const listSaleOrdersController = new ListSaleOrdersController();
const approveSaleOrderController = new ApproveSaleOrderController();
const listProductsOrderController = new ListProductsOrderController();

ordersRouter.use(ensureAuthentication);

ordersRouter.get('/', listSaleOrdersController.handle);
ordersRouter.post('/', createSaleOrderController.handle);
ordersRouter.post('/:sale_order_id', approveSaleOrderController.handle);
ordersRouter.get('/:sale_order_id', listProductsOrderController.handle);

export default ordersRouter;
