import {Request, Response} from 'express';
import {container} from 'tsyringe';
import DeleteProductUseCase from './DeleteProductUseCase';

class DeleteProductController {
  public async handle(request: Request, response:Response):Promise<Response>{
    const {id} = request.user;

    const {product_id} = request.params

    const deleteProduct = container.resolve(DeleteProductUseCase);

    await deleteProduct.execute({
      user_id: id,
      product_id
    })

    return response.status(204).send()
  }
}

export default DeleteProductController
