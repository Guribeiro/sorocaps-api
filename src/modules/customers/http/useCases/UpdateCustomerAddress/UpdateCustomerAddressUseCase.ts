import {inject, injectable} from 'tsyringe';
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import CustomersRepository from "@modules/customers/infra/typeorm/repositories/CustomersRepository";
import CustomerAddressRepository from "@modules/customers/infra/typeorm/repositories/CustomerAddressRepository";
import AppError from '@shared/errors/AppError';
import CustomerAddress from '@modules/customers/infra/typeorm/entities/CustomerAddress';

interface UpdatedCustomerAddress {
  cep: string;
  number: string;
  district: string;
  country: string;
  state: string;
  street: string;

}

interface Request {
  user_id: string;
  customer_id: string;
  customer_address: UpdatedCustomerAddress;
}

@injectable()
class UpdateCustomerAddressUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('CustomersRepository')
    private customersRepository: CustomersRepository,

    @inject('CustomerAddressRepository')
    private customerAddressRepository: CustomerAddressRepository
  ){}
  public async exeucte({user_id, customer_id, customer_address}:Request):Promise<CustomerAddress>{
    const user = await this.usersRepository.findOneById(user_id);

    if(!user){
      throw new AppError('invalid user token')
    }

    const customer = await this.customersRepository.findOneById(customer_id);

    if(!customer){
      throw new AppError('customer could not be found');
    }

    Object.assign<CustomerAddress, UpdatedCustomerAddress>(customer.customer_address, customer_address)

    const updated_customer_address = await this.customerAddressRepository.save(customer.customer_address);

    return updated_customer_address;
  }
}

export default UpdateCustomerAddressUseCase
