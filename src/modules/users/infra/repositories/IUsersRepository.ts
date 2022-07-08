import User from "../typeorm/entities/User";
import ICreateUserDTO from "../../dtos/ICreateUserDTO";

export default interface IUsersRepository {
  create(data: ICreateUserDTO):Promise<User>;
  findOneById(user_id: string):Promise<User | undefined>;
  findOneByEmail(user_email: string):Promise<User | undefined>;
  list():Promise<User[]>;
}
