import Customer from '@modules/customers/entities/Customer';
import {inject, injectable} from 'tsyringe';
import CustomersRepository from '@modules/customers/repositories/implementations/CustomersRepository';
import AppError from '@shared/errors/AppError';

interface Request {
  user_id: string;
  cnpj: string;
  corporate_name: string;
}

@injectable()
class CreateCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: CustomersRepository
  ){}

  public async execute({user_id, cnpj, corporate_name}: Request):Promise<Customer>{

    const customerWithSameUserId = await this.customersRepository.findOneByUserId(user_id);

    if(customerWithSameUserId){
      throw new AppError('You already have an account');
    }

    const customer = await this.customersRepository.create({
      user_id,
      cnpj,
      corporate_name,
    })

    return customer;
  }
}

export default CreateCustomerUseCase;
