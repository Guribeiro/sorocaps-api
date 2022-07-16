import IOrderProductsRepository from "../../repositories/IOrderProductsRepository";
import {Repository, getRepository} from 'typeorm';
import OrderProduct from '@modules/orders/infra/typeorm/entities/OrderProduct';
import ICreateOrderProductDTO from "@modules/orders/dtos/ICreateOrderProductDTO";

class OrderProductsRepository implements IOrderProductsRepository {
  private repository: Repository<OrderProduct>;
  constructor(){
    this.repository = getRepository(OrderProduct);
  }

  public async create({product_id, price, quantity, sale_order_id}: ICreateOrderProductDTO): Promise<OrderProduct> {
    const order_product = this.repository.create({
      product_id,
      total_price: price,
      quantity,
      sale_order_id,
    });

    await this.repository.save(order_product);

    return order_product;
  }

  public async findBySaleOrderId(sale_order_id: string): Promise<OrderProduct[]> {
      const order_products = await this.repository.find({where: {sale_order_id}});

      return order_products;
  }
}

export default OrderProductsRepository;
