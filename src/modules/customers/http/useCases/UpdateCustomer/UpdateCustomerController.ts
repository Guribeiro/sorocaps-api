import {Request, Response} from 'express';
import {container} from 'tsyringe';
import UpdateCustomerUseCase from './UpdateCustomerUseCase';

class UpdateCustomerController {
  public async handle(request:Request, response:Response):Promise<Response>{
    const {id} = request.user;
    const {customer_id} = request.params;
    const {corporate_name, phone} = request.body;


    const updateCustomer = container.resolve(UpdateCustomerUseCase);

    const updated_customer = await updateCustomer.execute({
      user_id: id,
      customer_id,
      corporate_name,
      phone
    })

    return response.status(200).json(updated_customer);
  }
}
export default UpdateCustomerController
