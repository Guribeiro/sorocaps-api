import {injectable, inject} from 'tsyringe';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import StocksRepository from '@modules/stocks/infra/typeorm/repositories/StocksRepository';
import OrderProductsRepository from '@modules/orders/infra/typeorm/repositories/OrderProductRepository';

import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import OrderProduct from '@modules/orders/infra/typeorm/entities/OrderProduct';
import AppError from '@shared/errors/AppError';
import Product from '@modules/products/infra/typeorm/entities/Product';

interface RequestOrderProduct {
  id: string;
  quantity: number;
}

interface Response {
  order:Order;
  order_products: OrderProduct[];
}

interface Request {
  user_id: string;
  customer_id: string;
  products: RequestOrderProduct[];
}

@injectable()
class CreateSaleOrderUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('CustomersRepository')
    private customersRepository: CustomersRepository,

    @inject('OrdersRepository')
    private ordersRepository: OrdersRepository,

    @inject('StocksRepository')
    private stocksRepository: StocksRepository,

    @inject('OrderProductsRepository')
    private orderProductsRepository: OrderProductsRepository
  ){}
  public async execute({user_id, customer_id, products}:Request):Promise<Response>{

    const user = await this.usersRepository.findOneById(user_id);;

    if(!user){
      throw new AppError('invalid user token')
    }

    const customer = await this.customersRepository.findOneById(customer_id);

    if(!customer){
      throw new AppError('customer could not be found');
    }

    const order = await this.ordersRepository.create({
      customer_id: customer.id,
      status: 'pending'
    });

    let order_products:OrderProduct[] = [];

    for await (const product of products) {
      const product_stock = await this.stocksRepository.findOneByProductId(product.id);

      if(!product_stock){
        throw new AppError('product is missing in stock');
      }

      if(product.quantity > product_stock.amount){
        throw new AppError('product quantity is missing in stock');
      }


      const order_product = await this.orderProductsRepository.create({
        sale_order_id: order.id,
        product_id: product.id,
        quantity: product.quantity,
        price: Number(product_stock.price_unit) * product.quantity,
      });

      order_products.push(order_product);

    }

    const order_product_total_price = order_products.reduce((accumulator, current) => accumulator + current.total_price, 0);

    order.price = order_product_total_price;

    await this.ordersRepository.save(order);

    return {
      order,
      order_products
    }
  }
}

export default CreateSaleOrderUseCase;
