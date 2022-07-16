import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import {injectable, inject} from 'tsyringe';
import AppError from '@shared/errors/AppError';

interface Request {
  user_id: string;
  product_id: string;
}

@injectable()
class DeleteProductUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('ProductsRepository')
    private productsRepository: ProductsRepository
  ){}
  public async execute({user_id, product_id}:Request):Promise<void>{

    const user = await this.usersRepository.findOneById(user_id);

    if(!user){
      throw new AppError('invalid user token')
    }

    const product = await this.productsRepository.findOneById(product_id);

    if(!product){
      throw new AppError('product could not be found');
    }

    await this.productsRepository.remove(product);
  }
}


export default DeleteProductUseCase
