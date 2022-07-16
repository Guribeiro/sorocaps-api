import Order from "../typeorm/entities/Order";
import ICreateSaleOrderDTO from "@modules/orders/dtos/ICreateSaleOrderDTO";
import IAllOrdersDTO from "@modules/orders/dtos/IAllOrdersDTO";

export default interface IOrdersRepository {
  create(data: ICreateSaleOrderDTO):Promise<Order>;
  all(data: IAllOrdersDTO):Promise<Order[]>;
  findOneById(id: string):Promise<Order | undefined>
  findByCustomerId(customer_id: string):Promise<Order[]>
  save(order: Order):Promise<Order>;
  removeMany(orders: Order[]):Promise<void>;
}
