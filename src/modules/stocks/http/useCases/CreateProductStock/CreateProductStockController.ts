import {Request, Response} from 'express';
import {container} from 'tsyringe';
import CreateProductStockUseCase from '@modules/stocks/http/useCases/CreateProductStock/CreateProductStockUseCase';

class CreateProductStockController {
  public async handle(request:Request, response:Response):Promise<Response>{
    const {id} = request.user;
    const {product_id, amount, limit } = request.body;

    const createProductStock = container.resolve(CreateProductStockUseCase);

    const stock = await createProductStock.execute({
      user_id: id,
      product_id,
      amount,
      limit,
    })

    return response.status(200).json(stock);
  }
}

export default CreateProductStockController;
