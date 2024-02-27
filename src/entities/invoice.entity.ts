import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Project } from './project.entity';

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

  @ManyToOne(() => Customer, (customer) => customer.invoices, { eager: true })
  customer: Customer;

  @ManyToMany(() => Project, (project) => project.invoices, { eager: true })
  projects: Project[];
}
