import {container} from 'tsyringe';

import '@modules/users/providers';

// import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
// import CustomersRepository from '@modules/customers/repositories/implementations/CustomersRepository';

import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';


container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

// container.registerSingleton<ICustomersRepository>(
//   'CustomersRepository',
//   CustomersRepository
// );
