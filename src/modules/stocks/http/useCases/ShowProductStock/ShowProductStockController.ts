import {Request, Response} from 'express';
import {container} from 'tsyringe';
import ShowProductStockUseCase from './ShowProductStockUseCase';

class ShowProductStockController {
  public async handle(request:Request, response:Response):Promise<Response>{
    const {id} = request.user;

    const {stock_id} = request.params;

    const showProductStock = container.resolve(ShowProductStockUseCase);

    const product_stock = await showProductStock.execute({
      user_id: id,
      stock_id,
    })

    return response.status(200).json(product_stock)
  }
}
export default ShowProductStockController
