import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Invoice } from './invoice.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Customer, (customer) => customer.projects)
  customer: Customer;

  @ManyToMany(() => Invoice, (invoice) => invoice.projects, {
    cascade: ['update'],
    onDelete: 'CASCADE',
  })
  @JoinTable()
  invoices: Invoice[];
}
