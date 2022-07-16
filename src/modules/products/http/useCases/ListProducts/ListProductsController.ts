import {Request, Response} from 'express';
import {container} from 'tsyringe';
import ListProductsUseCase from './ListProductsUseCase';

class ListProductsController {
  public async handle(request:Request, response: Response):Promise<Response>{
    const {id} = request.user;

    const listProducts = container.resolve(ListProductsUseCase);

    const products = await listProducts.execute({
      user_id: id
    });


    return response.json(products)
  }
}

export default ListProductsController;
