import {injectable, inject} from 'tsyringe';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';

interface Request {
  user_id: string;
}

@injectable()
class ListCustomersUseCase{
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('CustomersRepository')
    private customersRepository: CustomersRepository,
  ){}
  public async execute({user_id}:Request):Promise<Customer[]>{
    const user = await this.usersRepository.findOneById(user_id);

    if(!user){
      throw new AppError('invalid user token')
    }

    const customers = await this.customersRepository.all();

    return customers;
  }
}


export default ListCustomersUseCase;
