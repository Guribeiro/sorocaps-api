import {injectable,inject} from 'tsyringe';

import CustomerAddressRepository from '@modules/customers/infra/typeorm/repositories/CustomerAddressRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import AppError from '@shared/errors/AppError';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

interface Request {
  user_id: string;
  customer_id: string;
  cep: string;
  number: string;
  street: string;
  district: string;
  state: string;
  country: string;
}

@injectable()
class CreateCustomerAddressUseCase{
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('CustomersRepository')
    private customersRepository: CustomersRepository,

    @inject('CustomerAddressRepository')
    private customerAddressRepository: CustomerAddressRepository
  ){}

  public async execute({user_id, customer_id, cep, number, street, district, state, country}:Request):Promise<Customer>{

    const user = await this.usersRepository.findOneById(user_id);

    if(!user){
      throw new AppError('invalid user token')
    }

    const customer = await this.customersRepository.findOneById(customer_id);

    if(!customer) {
      throw new AppError('customer could not be found');
    }

    const customer_address = await this.customerAddressRepository.create({
      cep,
      number,
      street,
      district,
      state,
      country
    });

    customer.customer_address_id = customer_address.id;
    customer.customer_address = customer_address;

    const updatedCustomer = await this.customersRepository.save(customer);

    return updatedCustomer;
  }
}

export default CreateCustomerAddressUseCase;
