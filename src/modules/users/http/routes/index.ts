import {Router} from 'express';

import CreateUserController from '@modules/users/http/useCases/CreateUser/CreateUserController';
import ListUsersController from '@modules/users/http/useCases/ListUsers/ListUsersController';

const usersRouter = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

usersRouter.post('/', createUserController.handle);
usersRouter.get('/', listUsersController.handle);


export default usersRouter;
