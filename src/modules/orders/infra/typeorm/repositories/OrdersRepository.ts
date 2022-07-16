import ICreateSaleOrderDTO from '@modules/orders/dtos/ICreateSaleOrderDTO';
import {Repository, getRepository} from 'typeorm';
import Order from '../entities/Order';
import IOrdersRepository from "../../repositories/IOrdersRepository";
import IAllOrdersDTO from '@modules/orders/dtos/IAllOrdersDTO';

class OrdersRepository implements IOrdersRepository {
  private repository: Repository<Order>;

  constructor(){
    this.repository = getRepository(Order);
  }

  public async create({customer_id, status}:ICreateSaleOrderDTO):Promise<Order>{
    const order = this.repository.create({
      customer_id,
      status
    });

    await this.repository.save(order);

    return order;
  }

  public async all({status, skip, take}:IAllOrdersDTO): Promise<Order[]> {
    let orders: Order[];

    if(status){
      orders = await this.repository.find({
        where: {status},
        skip,
        take
      });
      return orders
    }

    orders = await this.repository.find({
      take,
      skip
    });

    return orders;
  }

  public async findByCustomerId(customer_id: string): Promise<Order[]> {
    const customer_orders = await this.repository.find({where: {customer_id}});

    return customer_orders
  }

  public async findOneById(id: string): Promise<Order | undefined> {
    const order = await this.repository.findOne({where: {id}});

    return order;
  }

  public async save(order: Order): Promise<Order> {
    return await this.repository.save(order);
  }

  public async removeMany(orders: Order[]): Promise<void> {
    await this.repository.remove(orders);
  }

}

export default OrdersRepository;
