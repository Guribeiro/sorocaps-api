import {injectable, inject} from 'tsyringe';
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import StocksRepository from '@modules/stocks/infra/typeorm/repositories/StocksRepository';
import Stock from '@modules/stocks/infra/typeorm/entities/Stock';
import AppError from '@shared/errors/AppError';

interface Request {
  user_id: string;
  product_id?:string;
}

@injectable()
class ListProductsStockUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('StocksRepository')
    private stocksRepository: StocksRepository,

  ){}
  public async execute({user_id}:Request):Promise<Stock[]>{

    const user = await this.usersRepository.findOneById(user_id);

    if(!user){
      throw new AppError('invalid user token')
    }

    const products_stock = await this.stocksRepository.all()

    return products_stock;
  }
}

export default ListProductsStockUseCase;
