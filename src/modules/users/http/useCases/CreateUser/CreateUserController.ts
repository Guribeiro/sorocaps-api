import {Request, Response} from 'express';
import {container} from 'tsyringe';
import CreateUserUseCase from './CreateUserUseCase';

class CreateUserController {
  public async handle(request:Request, response:Response):Promise<Response>{
    const {full_name, email, username, password} = request.body;

    const createUser = container.resolve(CreateUserUseCase);

    const user = await createUser.execute({
      full_name,
      email,
      username,
      password
    })
    return response.json(user);
  }
}

export default CreateUserController;
