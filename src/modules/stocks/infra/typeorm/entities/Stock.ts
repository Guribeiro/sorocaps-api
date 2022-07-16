import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import Product from '@modules/products/infra/typeorm/entities/Product';

@Entity('stocks')
class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'integer'})
  amount: number;

  @Column({type: 'integer'})
  limit: number;

  @Column({type: 'decimal', precision: 2})
  price_unit: number;

  @Column()
  product_id: string;

  @ManyToOne(() => Product, {eager: true})
  @JoinColumn({name: 'product_id'})
  product: Product;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Stock;
