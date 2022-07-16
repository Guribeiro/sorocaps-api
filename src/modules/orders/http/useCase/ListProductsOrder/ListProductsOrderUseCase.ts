import {injectable, inject} from 'tsyringe';
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import OrdersRepository from "@modules/orders/infra/typeorm/repositories/OrdersRepository";
import OrderProductsRepository from "@modules/orders/infra/typeorm/repositories/OrderProductRepository";
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import AppError from '@shared/errors/AppError';
import OrderProduct from '@modules/orders/infra/typeorm/entities/OrderProduct';


interface Request {
  user_id: string;
  order_id: string;
  customer_id: string;
}

@injectable()
class ListProductsOrderUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('OrdersRepository')
    private ordersRepository: OrdersRepository,

    @inject('OrderProductsRepository')
    private orderProductsRepository: OrderProductsRepository,

    @inject('CustomersRepository')
    private customersRepository: CustomersRepository
  ){}
  public async execute({user_id, customer_id, order_id}:Request):Promise<OrderProduct[]>{
    const user = await this.usersRepository.findOneById(user_id);

    if(!user){
      throw new AppError('invalid user token')
    }

    const customer = await this.customersRepository.findOneById(customer_id);

    if(!customer){
      throw new AppError('customer could not be found');
    }

    const order = await this.ordersRepository.findOneById(order_id);

    if(!order){
      throw new AppError('order could not be found');
    }

    const products_order = await this.orderProductsRepository.findBySaleOrderId(order_id);

    return products_order;

  }
}

export default ListProductsOrderUseCase
