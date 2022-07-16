import {injectable, inject} from 'tsyringe';
import UsersRepository from '@modules/users/infra/sequelize/repositories/UsersRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import StocksRepository from '@modules/stocks/infra/typeorm/repositories/StocksRepository';

import Stock from '@modules/stocks/infra/typeorm/entities/Stock';
import AppError from '@shared/errors/AppError';

interface Request {
  user_id: string;
  product_id: string;
  amount: number;
  limit: number;
}

@injectable()
class CreateProductStockUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('ProductsRepository')
    private productsRepository: ProductsRepository,

    @inject('StocksRepository')
    private stocksRepository: StocksRepository,
  ){}

  public async execute({user_id, product_id, amount, limit}:Request):Promise<Stock>{

    const user = await this.usersRepository.findOneById(user_id);

    if(!user){
      throw new AppError('invalid user token');
    }

    const product = await this.productsRepository.findOneById(product_id);

    if(!product){
      throw new AppError('product could not be found');
    }

    const alreadyExistProductStock = await this.stocksRepository.findOneByProductId(product_id);

    if(alreadyExistProductStock){
      throw new AppError('there is already exist an stock for this product');
    }

    const stock = await this.stocksRepository.create({
      product_id,
      amount,
      limit,
      price_unit: product.buy_price
    });

    return stock;

  }
}

export default CreateProductStockUseCase;
