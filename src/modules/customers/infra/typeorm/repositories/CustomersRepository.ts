import {Repository, getRepository} from 'typeorm';
import ICreateCustomerDTO from "@modules/customers/dtos/ICreateCustomerDTO";
import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import ICustomersRepository from "../../repositories/ICustomersRepository";

class CustomersRepository implements ICustomersRepository {
  private repository: Repository<Customer>;

  constructor(){
    this.repository = getRepository(Customer);
  }

  public async create({cnpj, corporate_name, phone}: ICreateCustomerDTO): Promise<Customer> {
    const customer = this.repository.create({
      cnpj,
      corporate_name,
      phone,
    });

    await this.repository.save(customer);

    return customer;
  }

  public async save(customer:Customer):Promise<Customer>{
    return await this.repository.save(customer);
  }

  public async findOneById(id: string): Promise<Customer | undefined> {
    const customer = await this.repository.findOne({where: {id}});

    return customer;
  }

  public async findOneByCnpj(cnpj: string): Promise<Customer | undefined> {
    const customer = await this.repository.findOne({where: {cnpj}});

    return customer;
  }

  public async findOneByUserId(user_id: string): Promise<Customer | undefined> {
    const customer = await this.repository.findOne({where: {user_id}});

    return customer;
  }

  public async all():Promise<Customer[]>{
    const customers = await this.repository.find();

    return customers;
  }

  public async remove(customer: Customer): Promise<void> {
        await this.repository.remove(customer);
  }
}

export default CustomersRepository;
