import {Request, response, Response} from 'express';
import {container} from 'tsyringe';

import UpdateProductUseCase from './UpdateProductUseCase';

class UpdateProductController {
  public async handle(request:Request, response: Response):Promise<Response>{
    const {id} = request.user;
    const {product_id} = request.params;

    const {
      bar_code,
      title,
      description,
      quantity_in_units,
      unit_of_measurement,
      buy_price,
      sale_price
    } = request.body;

    const updateProduct = container.resolve(UpdateProductUseCase);

    const updated_product = await updateProduct.execute({
      user_id: id,
      product_id,
      product: {
        bar_code,
        title,
        description,
        quantity_in_units,
        unit_of_measurement,
        buy_price,
        sale_price
      }
    })

    return response.status(200).json(updated_product);
  }
}

export default UpdateProductController;
