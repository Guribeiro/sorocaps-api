import {Router} from 'express';
import AuthenticateUserController from '@modules/users/http/useCases/AuthenticateUser/AuthenticateUserController';

const sessionRouter = Router();

const authenticateUserController = new AuthenticateUserController();

sessionRouter.post('/', authenticateUserController.handle);

export default sessionRouter;
