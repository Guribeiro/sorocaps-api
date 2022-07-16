import Stock from "../typeorm/entities/Stock";
import ICreateStockDTO from "@modules/stocks/dtos/ICreateStockDTO";

export default interface IStocksRepository {
  create(data:ICreateStockDTO):Promise<Stock>;
  findOneByProductId(product_id: string): Promise<Stock | undefined>;
  all():Promise<Stock[]>;
  save(stock:Stock):Promise<Stock>;
  findOne(stock_id: string):Promise<Stock | undefined>;
}
