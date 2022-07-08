import {v4} from 'uuid';
import ICreateCustomerDTO from "@modules/customers/dtos/ICreateCustomerDTO";
import Customer from "@modules/customers/entities/Customer";
import ICustomersRepository from "../ICustomersRepository";

class CustomersRepository implements ICustomersRepository {
  private customers: Customer[];

  constructor(){
    this.customers = [];
  }

  public async create({cnpj, corporate_name, user_id}: ICreateCustomerDTO): Promise<Customer> {
    const id = v4();
    const customer = new Customer({
      id,
      cnpj,
      corporate_name,
      user_id
    });

    this.customers.push(customer);

    return customer;
  }

  public async findOneByUserId(user_id: string): Promise<Customer | undefined> {
    const customer = await this.customers.find(customer => customer.user_id === user_id);

    return customer;
  }
}

export default CustomersRepository;
