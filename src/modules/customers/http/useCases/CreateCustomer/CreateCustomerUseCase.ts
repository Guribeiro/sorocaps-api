import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import {inject, injectable} from 'tsyringe';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import AppError from '@shared/errors/AppError';


interface Request {
  user_id: string;
  cnpj: string;
  corporate_name: string;
  phone: string;
}

@injectable()
class CreateCustomerUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('CustomersRepository')
    private customersRepository: CustomersRepository
  ){}

  public async execute({user_id, cnpj, corporate_name, phone}: Request):Promise<Customer>{

    const user = await this.usersRepository.findOneById(user_id);

    if(!user){
      throw new AppError('invalid user token')
    }

    const customerWithSameCnpj = await this.customersRepository.findOneByCnpj(cnpj);

    if(customerWithSameCnpj){
      throw new AppError('cnpj is already been used by another user');
    }

    const customer = await this.customersRepository.create({
      cnpj,
      corporate_name,
      phone,
    })

    return customer;
  }
}

export default CreateCustomerUseCase;
