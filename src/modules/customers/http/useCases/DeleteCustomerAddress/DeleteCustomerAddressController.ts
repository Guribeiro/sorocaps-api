import {Request, Response} from 'express';
import {container} from 'tsyringe';
import DeleteCustomerAddressUseCase from './DeleteCustomerAddressUseCase';

class DeleteCustomerAddressController {
  public async handle(request:Request, response:Response):Promise<Response>{
    const {id} = request.user;

    const {customer_id} = request.params;
    const deleteCustomerAddress = container.resolve(DeleteCustomerAddressUseCase);

    await deleteCustomerAddress.execute({
      user_id: id,
      customer_id
    })
    return response.status(204).send();
  }
}

export default DeleteCustomerAddressController;
