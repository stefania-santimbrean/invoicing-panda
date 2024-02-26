import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  nr: number;

  @Column()
  isStorno: boolean;

  @Column()
  currency: string;

  @Column()
  amount: string;

  @ManyToOne(() => Customer, (customer) => customer.invoices)
  customer: Customer;
}
