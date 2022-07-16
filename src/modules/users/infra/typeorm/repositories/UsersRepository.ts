import {Repository, getRepository} from 'typeorm';
import IUsersRepository from "@modules/users/infra/repositories/IUsersRepository";
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';


class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor(){
    this.repository = getRepository(User);
  }

  public async create({full_name, email, username, password}: ICreateUserDTO): Promise<User> {
      const user = this.repository.create({
        full_name,
        email,
        username,
        password,
      });

      await this.repository.save(user);

      return user;
  }

  public async findOneById(user_id: string): Promise<User | undefined> {
      const user = await this.repository.findOne({where: {id: user_id}});

      return user;
  }

  public async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({where: {email}});

    return user;
}

  public async list(): Promise<User[]> {
      const users = await this.repository.find();

      return users;
  }

}

export default UsersRepository;
