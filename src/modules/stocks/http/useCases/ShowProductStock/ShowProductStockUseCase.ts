import {injectable, inject} from 'tsyringe';
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import StocksRepository from '@modules/stocks/infra/typeorm/repositories/StocksRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import Stock from '@modules/stocks/infra/typeorm/entities/Stock';
import AppError from '@shared/errors/AppError';

interface Request {
  user_id: string;
  stock_id: string;
}

@injectable()
class ShowProductStockUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('StocksRepository')
    private stocksRepository: StocksRepository,
  ){}
  public async execute({user_id, stock_id}:Request):Promise<Stock | undefined>{

    const user = await this.usersRepository.findOneById(user_id);

    if(!user){
      throw new AppError('invalid user token')
    }

    const product_stock = await this.stocksRepository.findOne(stock_id);

    return product_stock;
  }
}

export default ShowProductStockUseCase;
