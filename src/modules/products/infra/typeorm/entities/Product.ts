import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  bar_code: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  unit_of_measurement: string;

  @Column()
  quantity_in_units: number;

  @Column()
  buy_price: number;

  @Column()
  sale_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
