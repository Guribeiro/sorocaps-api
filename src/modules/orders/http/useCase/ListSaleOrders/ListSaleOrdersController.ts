import {Request, Response} from 'express';
import {container} from 'tsyringe';
import ListSaleOrdersUseCase from './ListSaleOrdersUseCase';

class ListSaleOrdersController {
  public async handle(request:Request, response:Response):Promise<Response>{
    const {id} = request.user;
    const {status, take, skip} = request.query

    const listSaleOrders = container.resolve(ListSaleOrdersUseCase);

    const sale_orders = await listSaleOrders.execute({
      user_id: id,
      status: status as string,
      skip: Number(skip) || 0,
      take: Number(take) || 10,
    });

    return response.json(sale_orders)
  }
}
export default ListSaleOrdersController;
