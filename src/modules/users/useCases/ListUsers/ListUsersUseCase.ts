import {injectable, inject} from 'tsyringe';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

@injectable()
class ListUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository
  ){}

  public async execute():Promise<User[]>{
    const users = await this.usersRepository.list();

    return users;
  }
}

export default ListUsersUseCase;
