import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import CustomerAddress from './CustomerAddress';

@Entity('customers')
class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cnpj: string;

  @Column()
  corporate_name: string;

  @Column()
  phone: string;

  @Column()
  customer_address_id: string;

  @ManyToOne(() => CustomerAddress, {eager: true})
  @JoinColumn({name: 'customer_address_id'})
  customer_address: CustomerAddress;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Customer;
