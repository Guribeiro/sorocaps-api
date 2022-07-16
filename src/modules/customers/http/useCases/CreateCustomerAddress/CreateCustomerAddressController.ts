import {Request, Response} from 'express';
import {container} from 'tsyringe';
import CreateCustomerAddressUseCase from './CreateCustomerAddressUseCase';

class CreateCustomerAddressController {
  public async handle(request:Request, response:Response):Promise<Response>{
    const {id} = request.user;
    const {customer_id} = request.params;
    const {cep, number, district, country, state, street} = request.body;
    const createCustomerAddress = container.resolve(CreateCustomerAddressUseCase);

    const customer = await createCustomerAddress.execute({
      user_id: id,
      customer_id,
      cep,
      number,
      district,
      country,
      state,
      street
    });

    return response.json(customer);
  }
}

export default CreateCustomerAddressController;
