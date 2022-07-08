import {Router} from 'express';

import CreateUserController from '@modules/users/useCases/CreateUser/CreateUserController';
import ListUsersController from '@modules/users/useCases/ListUsers/ListUsersController';

const usersRouter = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

usersRouter.post('/', createUserController.handle);
usersRouter.get('/', listUsersController.handle);


export default usersRouter;
