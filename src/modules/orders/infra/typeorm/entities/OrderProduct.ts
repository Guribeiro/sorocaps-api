import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Product from '@modules/products/infra/typeorm/entities/Product';
import Order from './Order';

@Entity('order_products')
class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sale_order_id: string;

  @ManyToOne(() => Order)
  @JoinColumn({name: 'sale_order_id'})
  sale_order: Order;

  @Column()
  product_id: string;

  @ManyToOne(() => Product, {eager: true})
  @JoinColumn({name: 'product_id'})
  product: Order;

  @Column()
  total_price: number;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrderProduct;
