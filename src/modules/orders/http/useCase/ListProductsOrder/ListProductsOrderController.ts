import {Request, Response} from 'express';
import {container} from 'tsyringe';
import ListProductsOrderUseCase from './ListProductsOrderUseCase';

class ListProductsOrderController {
  public async handle(request:Request, response:Response):Promise<Response>{
    const {id} = request.user;
    const { sale_order_id } = request.params;
    const {customer_id} = request.query

    const listProductsOrder = container.resolve(ListProductsOrderUseCase);

    const products_order = await listProductsOrder.execute({
      user_id: id,
      order_id: sale_order_id,
      customer_id: String(customer_id)
    })

    return response.json(products_order)
  }
}

export default ListProductsOrderController;
