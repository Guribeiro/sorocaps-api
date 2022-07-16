import {Request, Response} from 'express';
import {container} from 'tsyringe';
import DeleteCustomerUseCase from './DeleteCustomerUseCase';

class DeleteCustomerController {
  public async handle(request:Request, response:Response):Promise<Response>{
    const {id} = request.user;
    const {customer_id} = request.params;
    const deleteCustomer = container.resolve(DeleteCustomerUseCase);

    await deleteCustomer.execute({
      user_id: id,
      customer_id,
    })
    return response.status(204).send();
  }
}

export default DeleteCustomerController;
