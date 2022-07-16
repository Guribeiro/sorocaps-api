import { injectable, inject } from "tsyringe";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import CustomersRepository from "@modules/customers/infra/typeorm/repositories/CustomersRepository";
import CustomerAddressRepository from "@modules/customers/infra/typeorm/repositories/CustomerAddressRepository";
import OrdersRepository from "@modules/orders/infra/typeorm/repositories/OrdersRepository";
import AppError from "@shared/errors/AppError";

interface Request {
  user_id: string;
  customer_id: string;
}

@injectable()
class DeleteCustomerUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('CustomersRepository')
    private customersRepository: CustomersRepository,

    @inject('CustomerAddressRepository')
    private customerAddressRepository: CustomerAddressRepository,

    @inject('OrdersRepository')
    private ordersRepository: OrdersRepository,
  ){}
  public async execute({user_id, customer_id}:Request):Promise<void>{

    const user = await this.usersRepository.findOneById(user_id);

    if(!user){
      throw new AppError('invalid user token')
    }

    const customer = await this.customersRepository.findOneById(customer_id);

    if(!customer){
      throw new AppError('customer could not be found')
    }
    const customer_orders = await this.ordersRepository.findByCustomerId(customer.id)

    if(!!customer_orders.length){
      await this.ordersRepository.removeMany(customer_orders);
    }

    if(customer.customer_address_id) {
      await this.customerAddressRepository.remove(customer.customer_address);
    }

    await this.customersRepository.remove(customer);

  }
}




export default DeleteCustomerUseCase
