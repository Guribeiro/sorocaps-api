import {Request, Response} from 'express';
import {container} from 'tsyringe';
import CreateSaleOrderUseCase from './CreateSaleOrderUseCase';

class CreateSaleOrderController {
  public async handle(request:Request, response:Response):Promise<Response>{
    const {id} = request.user;

    const {customer_id, products} = request.body;

    const createSaleOrder = container.resolve(CreateSaleOrderUseCase);

    const order = await createSaleOrder.execute({
      user_id: id,
      customer_id,
      products,
    });

    return response.json(order);
  }
}

export default CreateSaleOrderController;
