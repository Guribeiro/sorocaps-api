import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepository from "@modules/users/infra/repositories/IUsersRepository";
import { UserModel } from '@modules/users/infra/sequelize/models/User';

class UsersRepository implements IUsersRepository {

  public async create({name, password}: ICreateUserDTO): Promise<any> {

    const user = UserModel.build({
      name,
      password
    });

    await user.save();

    return user
  }

  public async findOneById(user_id: string): Promise<any> {
    const user = await UserModel.findOne({where: {user_id}});

    return user;
  }

  public async list(): Promise<any[]> {
    const users = await UserModel.findAll();

    return users;
  }

}

export default UsersRepository;
