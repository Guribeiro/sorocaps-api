import {Request, Response} from 'express';
import {container} from 'tsyringe';
import CreateProductUseCase from './CreateProductUseCase';

class CreateProductController {
  public async handle(request:Request, response:Response):Promise<Response>{
    const {id} = request.user;
    const {
      bar_code,
      title,
      description,
      quantity_in_units,
      unit_of_measurement,
      buy_price,
      sale_price
    } = request.body;

    const createProduct = container.resolve(CreateProductUseCase);

    const product = await createProduct.execute({
      user_id: id,
      bar_code,
      title,
      description,
      quantity_in_units,
      unit_of_measurement,
      buy_price,
      sale_price
    })

    return response.json(product);
  }
}

export default CreateProductController;
