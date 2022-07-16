import Customer from "../typeorm/entities/Customer";
import ICreateCustomerDTO from "@modules/customers/dtos/ICreateCustomerDTO";

export default interface ICustomersRepository {
  create(data: ICreateCustomerDTO):Promise<Customer>;
  findOneById(id: string): Promise<Customer | undefined>;
  findOneByCnpj(id: string): Promise<Customer | undefined>;
  findOneByUserId(id: string): Promise<Customer | undefined>;
  all():Promise<Customer[]>;
  save(customer: Customer):Promise<Customer>;
  remove(customer:Customer):Promise<void>;
}
