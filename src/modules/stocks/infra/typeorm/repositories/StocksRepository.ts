import {Repository, getRepository} from 'typeorm';
import ICreateStockDTO from '@modules/stocks/dtos/ICreateStockDTO';
import Stock from '@modules/stocks/infra/typeorm/entities/Stock';
import IStocksRepository from '@modules/stocks/infra/repositories/IStocksRepository';

class StocksRepository implements IStocksRepository {
  private repository: Repository<Stock>;

  constructor(){
    this.repository = getRepository(Stock);
  }

  public async create({amount, limit, price_unit, product_id}: ICreateStockDTO): Promise<Stock> {
    const stock = this.repository.create({
      amount,
      limit,
      price_unit,
      product_id,
    });

    await this.repository.save(stock);

    return stock;
  }

  public async findOne(stock_id: string): Promise<Stock | undefined> {
    const stock = await this.repository.findOne({where: {id: stock_id}});

    return stock;
  }

  public async findOneByProductId(product_id: string): Promise<Stock | undefined> {
    const stock = await this.repository.findOne({where: {product_id}});

    return stock;
  }

  public async all():Promise<Stock[]>{
    const stock = await this.repository.find();

    return stock;
  }

  public async save(stock: Stock): Promise<Stock> {
    return this.repository.save(stock);
  }
}

export default StocksRepository;
