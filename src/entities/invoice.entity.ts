import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { Project } from './project.entity';

@Entity()
export class Invoice {
  @PrimaryColumn({ unique: true, generatedIdentity: 'BY DEFAULT' })
  nr: number;

  @Column()
  isStorno: boolean;

  @Column()
  currency: string;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @ManyToOne(() => Customer, (customer) => customer.invoices, { eager: true })
  customer: Customer;

  @ManyToMany(() => Project, (project) => project.invoices, { eager: true })
  projects: Project[];
}
