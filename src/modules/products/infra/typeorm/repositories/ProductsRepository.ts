import {Repository, getRepository} from 'typeorm';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';

import Product from "../entities/Product";
import IProductsRepository from "../../repositories/IProductsRepostory";

class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;
  constructor(){
    this.repository = getRepository(Product);
  }

  public async create({
    bar_code,
    title,
    description,
    buy_price,
    sale_price,
    quantity_in_units,
    unit_of_measurement
  }:ICreateProductDTO): Promise<Product> {
    const product = this.repository.create({
      bar_code,
      title,
      description,
      unit_of_measurement,
      quantity_in_units,
      buy_price,
      sale_price
    });

    await this.repository.save(product);

    return product;
  }

  public async findOneByBarCode(bar_code: string): Promise<Product | undefined> {
    const product = await this.repository.findOne({where: {bar_code}});

    return product
  }

  public async findOneByTitle(title: string): Promise<Product | undefined> {
    const product = await this.repository.findOne({where: {title}});

    return product
  }

  public async findOneById(id: string): Promise<Product | undefined> {
    const product = await this.repository.findOne({where: {id}});

    return product
  }

  public async find():Promise<Product[]>{
    const products = await this.repository.find();

    return products;
  }

  public async remove(product: Product): Promise<void> {
    await this.repository.remove(product);
  }

  public async save(product: Product): Promise<Product> {
      return this.repository.save(product);
  }
}

export default ProductsRepository;
