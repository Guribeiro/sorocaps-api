import {Router} from 'express';
import ensureAuthentication from '@modules/users/http/middlewares/ensureAuthentication';
import CreateProductController from '@modules/products/http/useCases/CreateProduct/CreateProductController';
import ListProductsController from '../useCases/ListProducts/ListProductsController';
import DeleteProductController from '../useCases/DeleteProduct/DeleteProductController';
import UpdateProductController from '../useCases/UpateProduct/UpdateProductController';

const productsRouter = Router();

const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();
const deleteProductController = new DeleteProductController();
const updateProductController = new UpdateProductController();

productsRouter.use(ensureAuthentication);

productsRouter.post('/', createProductController.handle);
productsRouter.get('/', listProductsController.handle);
productsRouter.delete('/:product_id', deleteProductController.handle);
productsRouter.put('/:product_id', updateProductController.handle);

export default productsRouter;
