import {inject, injectable} from 'tsyringe';

import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import UsersRepository from '@modules/users/infra/sequelize/repositories/UsersRepository';
import StocksRepository from '@modules/stocks/infra/typeorm/repositories/StocksRepository';
import OrderProductsRepository from '@modules/orders/infra/typeorm/repositories/OrderProductRepository';

import AppError from '@shared/errors/AppError';
import Order from '@modules/orders/infra/typeorm/entities/Order';

interface Request {
  user_id: string;
  sale_order_id: string;
}

@injectable()
class ApproveSaleOrderUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('OrdersRepository')
    private ordersRepository: OrdersRepository,

    @inject('OrderProductsRepository')
    private orderProductsRepository: OrderProductsRepository,

    @inject('StocksRepository')
    private stocksRepository: StocksRepository
  ){}

  public async execute({user_id, sale_order_id}:Request):Promise<Order>{
    const user = await this.usersRepository.findOneById(user_id);

    if(!user){
      throw new AppError('invalid user token')
    }

    const sale_order = await this.ordersRepository.findOneById(sale_order_id);

    if(!sale_order){
      throw new AppError('sale order could not be found');
    }

    if(sale_order.status === 'approved') {
      throw new AppError('sale order is already approved');
    }

    const order_products = await this.orderProductsRepository.findBySaleOrderId(sale_order.id);

    for await(const order_product of order_products) {
      const stock_product = await this.stocksRepository.findOneByProductId(order_product.product_id);

      if(!stock_product) {
        throw new AppError('product is missing in stock');
      }

      if(order_product.quantity > stock_product.amount) {
        throw new AppError('product quantity is missing in stock');
      }

      stock_product.amount -= order_product.quantity;

      await this.stocksRepository.save(stock_product);
    }

    sale_order.status = 'approved';

    const approved_sale_order = await this.ordersRepository.save(sale_order);

    return approved_sale_order;
  }
}

export default ApproveSaleOrderUseCase;
