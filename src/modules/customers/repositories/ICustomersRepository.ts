import Customer from "../entities/Customer";
import ICreateCustomerDTO from "../dtos/ICreateCustomerDTO";

export default interface ICustomersRepository {
  create(data: ICreateCustomerDTO):Promise<Customer>;
  findOneByUserId(id: string): Promise<Customer | undefined>;
}
