import {Request, Response} from 'express';
import {container} from 'tsyringe';
import ListProductsStockUseCase from './ListProductsStockUseCase';

class ListProductsStockController {
  public async handle(request:Request, response:Response):Promise<Response>{
    const {id} = request.user;
    const {product_id} = request.query;

    const listProductsStock = container.resolve(ListProductsStockUseCase);

    const products_stock = await listProductsStock.execute({
      user_id: id,
      product_id: String(product_id),
    });

    return response.status(200).json(products_stock)
  }
}

export default ListProductsStockController
