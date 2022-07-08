import {Router} from 'express';
import CreateCustomerController from '../useCases/CreateCustomer/CreateCustomerController';

const customersRouter = Router();

const createCustomerController = new CreateCustomerController();

customersRouter.post('/', createCustomerController.handle);

export default customersRouter;
