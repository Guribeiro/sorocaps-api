import {Router} from 'express';
import ensureAuthentication from '@modules/users/http/middlewares/ensureAuthentication';

import CreateProductStockController from '../useCases/CreateProductStock/CreateProductStockController';
import ListProductsStockController from '../useCases/ListProductsStock/ListProductsStockController';
import ShowProductStockController from '../useCases/ShowProductStock/ShowProductStockController';

const stocksRouter = Router();

const createProductStockController = new CreateProductStockController();
const listProductsStockController = new ListProductsStockController();
const showProductStockController = new ShowProductStockController();

stocksRouter.use(ensureAuthentication);

stocksRouter.post('/', createProductStockController.handle);
stocksRouter.get('/', listProductsStockController.handle);
stocksRouter.get('/:stock_id', showProductStockController.handle);

export default stocksRouter;
