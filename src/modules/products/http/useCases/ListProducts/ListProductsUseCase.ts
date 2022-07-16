import {injectable, inject} from 'tsyringe';
import ProductsRepository from "@modules/products/infra/typeorm/repositories/ProductsRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import Product from "@modules/products/infra/typeorm/entities/Product";
import StocksRepository from '@modules/stocks/infra/typeorm/repositories/StocksRepository';
import AppError from '@shared/errors/AppError';

interface Request {
  user_id: string;
}

@injectable()
class ListProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepository,

    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('StocksRepository')
    private stocksRepository: StocksRepository,

  ){}
  public async execute({user_id}:Request):Promise<Product[]>{

    const user = await this.usersRepository.findOneById(user_id);

    if(!user){
      throw new AppError('invalid user token')
    }

    const products = await this.productsRepository.find();

    return products;
  }
}

export default ListProductsUseCase;
