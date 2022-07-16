import {} from 'tsyringe';import {inject, injectable} from 'tsyringe';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import Product from '@modules/products/infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

interface RequestProduct {
  bar_code: string;
  title: string;
  description: string;
  unit_of_measurement: string;
  quantity_in_units: number;
  buy_price: number;
  sale_price: number;
}

interface Request {
  user_id: string;
  product_id: string;
  product: RequestProduct,

}

@injectable()
class UpdateProductUseCase{
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('ProductsRepository')
    private productsRepository: ProductsRepository,
  ){}

  public async execute({
      user_id,
      product_id,
      product: {
        bar_code,
        title,
        description,
        quantity_in_units,
        unit_of_measurement,
        buy_price,
        sale_price
    }
    }:Request):Promise<Product>{

      const user = await this.usersRepository.findOneById(user_id);

      if(!user){
        throw new AppError('invalid user token')
      }

      const findProductWithSameBarCode = await this.productsRepository.findOneByBarCode(bar_code);

      if(findProductWithSameBarCode && findProductWithSameBarCode.id !== product_id){
        throw new AppError('bar code is already been registered');
      }

      const findProductWithSameTitle = await this.productsRepository.findOneByTitle(title);

      if(findProductWithSameTitle && findProductWithSameTitle.id !== product_id){
        throw new AppError(`there is already a product with title "${title}"`);
      }

      if(buy_price > sale_price) {
        throw new AppError('sale price can not be greater than buy price');
      }

      const product = await this.productsRepository.findOneById(product_id);

      if(!product) {
        throw new AppError('product could not be found');
      }

      Object.assign(product, {
        bar_code,
        title,
        description,
        quantity_in_units,
        unit_of_measurement,
        buy_price,
        sale_price
      });

      const updated_product = await this.productsRepository.save(product);


      return updated_product;
  }
}

export default UpdateProductUseCase;
