import {inject, injectable} from 'tsyringe';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import AppError from '@shared/errors/AppError';

interface Request {
  full_name: string;
  email: string;
  username: string;
  password: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('HashProvider')
    private hashProvider: BCryptHashProvider,

    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ){}

  public async execute({full_name, email, username, password}:Request){

    const findUserWithSameEmail = await this.usersRepository.findOneByEmail(email);

    if(findUserWithSameEmail){
      throw new AppError('email is already been used by another user');
    }

    const passwordHashed = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      full_name,
      email,
      username,
      password: passwordHashed,
    });

    return user;
  }
}

export default CreateUserUseCase;
