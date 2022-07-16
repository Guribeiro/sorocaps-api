import {Request, Response} from 'express';
import {container} from 'tsyringe';
import ListCustomersUseCase from './ListCustomersUseCase';

class ListCustomersController {
  public async handle(request:Request, response:Response):Promise<Response>{
    const {id} = request.user;

    const listCustomers = container.resolve(ListCustomersUseCase);

    const customers = await listCustomers.execute({
      user_id: id,
    });

    return response.json(customers)
  }
}

export default ListCustomersController;
