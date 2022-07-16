import {Router} from 'express';

import ensureAuthentication from '@modules/users/http/middlewares/ensureAuthentication';

import CreateCustomerController from '../useCases/CreateCustomer/CreateCustomerController';
import DeleteCustomerController from '../useCases/DeleteCustomer/DeleteCustomerController';
import ListCustomersController from '@modules/customers/http/useCases/ListCustomers/ListCustomersController';
import CreateCustomerAddressController from '@modules/customers/http/useCases/CreateCustomerAddress/CreateCustomerAddressController';
import UpdateCustomerController from '../useCases/UpdateCustomer/UpdateCustomerController';
import UpdateCustomerAddressController from '../useCases/UpdateCustomerAddress/UpdateCustomerAddressController';
import DeleteCustomerAddressController from '../useCases/DeleteCustomerAddress/DeleteCustomerAddressController';

const customersRouter = Router();

const createCustomerController = new CreateCustomerController();
const deleteCustomerController = new DeleteCustomerController();
const createCustomerAddressController = new CreateCustomerAddressController();
const listCustomersController = new ListCustomersController();
const updateCustomerController = new UpdateCustomerController();
const updateCustomerAddressController = new UpdateCustomerAddressController();
const deleteCustomerAddressController = new DeleteCustomerAddressController();

customersRouter.use(ensureAuthentication);

customersRouter.get('/', listCustomersController.handle);
customersRouter.post('/', createCustomerController.handle);
customersRouter.put('/:customer_id', updateCustomerController.handle);
customersRouter.delete('/:customer_id', deleteCustomerController.handle);
customersRouter.post('/:customer_id/address', createCustomerAddressController.handle);
customersRouter.put('/:customer_id/address', updateCustomerAddressController.handle);
customersRouter.delete('/:customer_id/address', deleteCustomerAddressController.handle);

export default customersRouter;
