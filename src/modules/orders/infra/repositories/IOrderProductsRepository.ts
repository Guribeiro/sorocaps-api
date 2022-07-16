import OrderProduct from "../typeorm/entities/OrderProduct";
import ICreateOrderProductDTO from "@modules/orders/dtos/ICreateOrderProductDTO";

export default interface IOrderProductsRepository {
  create(data: ICreateOrderProductDTO):Promise<OrderProduct>;
  findBySaleOrderId(sale_order_id: string):Promise<OrderProduct[]>
}
