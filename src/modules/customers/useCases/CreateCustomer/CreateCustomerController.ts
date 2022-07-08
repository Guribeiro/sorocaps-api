import {Request, Response} from 'express';
import {container} from 'tsyringe';
import CreateCustomerUseCase from './CreateCustomerUseCase';

class CreateCustomerController {
  public async handle(request:Request, response:Response):Promise<Response> {
    const {user_id, cnpj, corporate_name} = request.body;

    const createCustomerUseCase = container.resolve(CreateCustomerUseCase);

    const customer = await createCustomerUseCase.execute({
      user_id,
      cnpj,
      corporate_name
    });

    return response.json(customer);
  }
}

export default CreateCustomerController;
