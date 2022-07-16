import {Request, Response} from 'express';
import {container} from 'tsyringe';
import ListUsersUseCase from './ListUsersUseCase';

class ListUsersController {
  public async handle(request:Request, response:Response):Promise<Response>{

    const listUsersUseCase = container.resolve(ListUsersUseCase);

    const users = await listUsersUseCase.execute();

    return response.json(users);
  }
}

export default ListUsersController;
