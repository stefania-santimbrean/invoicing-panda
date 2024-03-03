import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { Project } from './project.entity';

@Entity()
export class Invoice {
  @PrimaryColumn({ unique: true, generatedIdentity: 'BY DEFAULT' })
  nr: number;

  @Column()
  isStorno: boolean;

  @Column({ nullable: true })
  stornoRef: number; // id of existing storned invoice

  @Column()
  currency: string;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @Column({ default: false }) // usually when an invoice is created it is not yet paid
  paid: boolean;

  @ManyToOne(() => Customer, (customer) => customer.invoices, {
    eager: true,
  })
  customer: Customer;

  @ManyToMany(() => Project, (project) => project.invoices, {
    eager: true,
  })
  projects: Project[];
}
