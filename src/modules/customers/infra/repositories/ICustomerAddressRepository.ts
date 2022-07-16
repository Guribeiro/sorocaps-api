import CustomerAddress from "@modules/customers/infra/typeorm/entities/CustomerAddress";
import ICreateCustomerAddressDTO from "@modules/customers/dtos/ICreateCustomerAddressDTO";

export default interface ICustomerAddressRepository {
  findOneById(id: string):Promise<CustomerAddress | undefined>;
  create(data:ICreateCustomerAddressDTO):Promise<CustomerAddress>;
  remove(customerAddress: CustomerAddress):Promise<void>;
  save(customerAddress: CustomerAddress):Promise<CustomerAddress>;
}
