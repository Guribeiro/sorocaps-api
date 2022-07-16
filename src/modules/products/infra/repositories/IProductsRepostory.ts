import ICreateProductDTO from "@modules/products/dtos/ICreateProductDTO";
import Product from "../typeorm/entities/Product";

export default interface IProductsRepository {
  create(data: ICreateProductDTO):Promise<Product>;
  findOneByBarCode(bar_code: string):Promise<Product | undefined>;
  findOneById(bar_code: string):Promise<Product | undefined>;
  findOneByTitle(bar_code: string):Promise<Product | undefined>;
  find():Promise<Product[]>;
  remove(product:Product):Promise<void>
  save(product: Product):Promise<Product>;
}
