import {Request, Response} from 'express';
import {container} from 'tsyringe';
import ApproveSaleOrderUseCase from './ApproveSaleOrderUseCase';

class ApproveSaleOrderController {
  public async handle(request:Request, response:Response):Promise<Response>{
    const {id} = request.user;
    const {sale_order_id} = request.params;

    const approveSaleOrder = container.resolve(ApproveSaleOrderUseCase);
      await approveSaleOrder.execute({
        user_id: id,
        sale_order_id,
      })

      return response.status(200).send();
  }
}

export default ApproveSaleOrderController;
