import {injectable, inject} from 'tsyringe';
import UsersRepository from '@modules/users/infra/sequelize/repositories/UsersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import OrderProductsRepository from '@modules/orders/infra/typeorm/repositories/OrderProductRepository';
import AppError from '@shared/errors/AppError';
import Order from '@modules/orders/infra/typeorm/entities/Order';

interface Request {
  user_id: string;
  status: string;
  take: number,
  skip: number
}

@injectable()
class ListSaleOrdersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('OrdersRepository')
    private ordersRepository: OrdersRepository,

    @inject('OrderProductsRepository')
    private orderProductsRepository: OrderProductsRepository,
  ){}

  public async execute({user_id, status, skip, take}:Request):Promise<Order[]>{
    const user = await this.usersRepository.findOneById(user_id);

    if(!user){
      throw new AppError('invalid user token')
    }

    const sale_orders = await this.ordersRepository.all({status, skip, take});


    return sale_orders;
  }
}

export default ListSaleOrdersUseCase;
