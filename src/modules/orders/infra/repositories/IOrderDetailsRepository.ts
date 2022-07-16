import IAllOrdersDTO from "@modules/orders/dtos/IAllOrdersDTO";
import ICreateOrderDetailsDTO from "@modules/orders/dtos/ICreateOrderDetailsDTO";
import OrderDetails from "../typeorm/entities/OrderDetails";

export default interface IOrderDetailsRepository {
  create(data: ICreateOrderDetailsDTO):Promise<OrderDetails>
  all(data: IAllOrdersDTO):Promise<OrderDetails[]>;
  findOneByOrderId(order_id: string):Promise<OrderDetails>;
}
