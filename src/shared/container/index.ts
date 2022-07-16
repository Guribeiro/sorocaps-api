import {container} from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ICustomersRepository from '@modules/customers/infra/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

import ICustomerAddressRepository from '@modules/customers/infra/repositories/ICustomerAddressRepository';
import CustomerAddressRepository from '@modules/customers/infra/typeorm/repositories/CustomerAddressRepository';

import IStocksRepository from '@modules/stocks/infra/repositories/IStocksRepository';
import StocksRepository from '@modules/stocks/infra/typeorm/repositories/StocksRepository';

import IOrderProductsRepository from '@modules/orders/infra/repositories/IOrderProductsRepository';
import OrderProductsRepository from '@modules/orders/infra/typeorm/repositories/OrderProductRepository';

import IOrdersRepository from '@modules/orders/infra/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';


import IProductsRepository from '@modules/products/infra/repositories/IProductsRepostory';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';


container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository
);

container.registerSingleton<ICustomerAddressRepository>(
  'CustomerAddressRepository',
  CustomerAddressRepository
);

container.registerSingleton<IStocksRepository>(
  'StocksRepository',
  StocksRepository
);

container.registerSingleton<IOrderProductsRepository>(
  'OrderProductsRepository',
  OrderProductsRepository
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository
);
