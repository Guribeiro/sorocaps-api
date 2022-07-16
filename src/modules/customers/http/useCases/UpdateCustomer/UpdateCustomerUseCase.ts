import { inject, injectable } from "tsyringe";
import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import CustomersRepository from "@modules/customers/infra/typeorm/repositories/CustomersRepository";
import AppError from "@shared/errors/AppError";

interface Request {
  user_id: string;
  customer_id: string;
  corporate_name: string;
  phone: string;
}

@injectable()
class UpdateCustomerUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('CustomersRepository')
    private customersRepository: CustomersRepository,
  ){}
  public async execute({user_id, customer_id, corporate_name, phone}:Request):Promise<Customer>{
    const user = await this.usersRepository.findOneById(user_id);

    if(!user){
      throw new AppError('invalid user token')
    }

    const customer = await this.customersRepository.findOneById(customer_id);

    if(!customer){
      throw new AppError('customer could not be found');
    }

    customer.corporate_name = corporate_name;
    customer.phone = phone;

    await this.customersRepository.save(customer);

    return customer;

  }
}


export default UpdateCustomerUseCase
