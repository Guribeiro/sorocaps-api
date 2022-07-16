import {inject, injectable} from 'tsyringe';

import authConfig from '@config/auth';
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";

import BCryptHashProvider from "@modules/users/providers/HashProvider/implementations/BCryptHashProvider";
import JsonWebTokenProvider from '@modules/users/providers/JsonWebTokenProvider/implementations/JsonWebTokenProvider';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User,
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('HashProvider')
    private hashProvider: BCryptHashProvider,

    @inject('JsonWebTokenProvider')
    private jsonWebTokenProvider: JsonWebTokenProvider,

    @inject('UsersRepository')
    private usersRepository:UsersRepository
  ){}

  public async execute({email, password}:Request):Promise<Response>{

    const user = await this.usersRepository.findOneByEmail(email);

    if(!user){
      throw new AppError('wrong email/password credentials');
    }

    const matchPassword = this.hashProvider.compareHash(password, user.password);

    if(!matchPassword){
      throw new AppError('wrong email/password credentials');
    }

    const {secret, expiresIn} = authConfig.jwt;

    const token = this.jsonWebTokenProvider.signToken({
      payload: {},
      secret,
      options: {
        subject: user.id,
        expiresIn,
      }
    })

    return {
      token,
      user,
    }
  }
}


export default AuthenticateUserUseCase;
