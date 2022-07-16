import {Request, Response} from 'express';
import {container} from 'tsyringe';
import UpdateCustomerAddressUseCase from './UpdateCustomerAddressUseCase';

class UpdateCustomerAddressController {
  public async handle(request:Request, response:Response):Promise<Response>{
    const {id} = request.user;
    const {customer_id} = request.params;
    const {cep, number, district, country, state, street} = request.body;

    const updateCustomerAddress = container.resolve(UpdateCustomerAddressUseCase);

    const updated_customer_address = await updateCustomerAddress.exeucte({
      user_id: id,
      customer_id,
      customer_address: {
        cep,
        number,
        district,
        country,
        state,
        street
      }
    })

    return response.status(200).json(updated_customer_address);
  }
}

export default UpdateCustomerAddressController
