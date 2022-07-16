import {Repository, getRepository} from 'typeorm';
import CustomerAddress from "@modules/customers/infra/typeorm/entities/CustomerAddress";
import ICustomerAddressRepository from "@modules/customers/infra/repositories/ICustomerAddressRepository";
import ICreateCustomerAddressDTO from '@modules/customers/dtos/ICreateCustomerAddressDTO';

class CustomerAddressRepository implements ICustomerAddressRepository {
  private repository: Repository<CustomerAddress>;
  constructor(){
    this.repository = getRepository(CustomerAddress);
  }

  public async findOneById(id: string): Promise<CustomerAddress | undefined> {
    const userAddress = await this.repository.findOne({where: {id}});

    return userAddress;
  }

  public async create({cep, country, district, number, state, street}: ICreateCustomerAddressDTO): Promise<CustomerAddress> {
      const userAddress = this.repository.create({
        cep,
        country,
        district,
        number,
        state,
        street,
      });

      await this.repository.save(userAddress);

      return userAddress;
  }

  public async remove(userAddress: CustomerAddress): Promise<void> {
      await this.repository.remove(userAddress);
  }

  public async save(customerAddress: CustomerAddress): Promise<CustomerAddress> {
    return await this.repository.save(customerAddress);
  }
}

export default CustomerAddressRepository;
