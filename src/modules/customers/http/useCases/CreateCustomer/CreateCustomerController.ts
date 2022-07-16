import {Request, Response} from 'express';
import {container} from 'tsyringe';
import CreateCustomerUseCase from './CreateCustomerUseCase';

class CreateCustomerController {
  public async handle(request:Request, response:Response):Promise<Response> {
    const {id} = request.user;
    const {cnpj, corporate_name, phone} = request.body;

    const createCustomerUseCase = container.resolve(CreateCustomerUseCase);

    const customer = await createCustomerUseCase.execute({
      user_id: id,
      cnpj,
      corporate_name,
      phone,
    });

    return response.json(customer);
  }
}

export default CreateCustomerController;
