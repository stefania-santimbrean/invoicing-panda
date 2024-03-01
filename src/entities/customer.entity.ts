import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from './project.entity';
import { Invoice } from './invoice.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Project, (project) => project.customer, {
    cascade: ['update'],
    onDelete: 'CASCADE',
  })
  projects: Project[];

  @OneToMany(() => Invoice, (invoice) => invoice.customer, {
    cascade: ['update'],
    onDelete: 'CASCADE',
  })
  invoices: Invoice[];
}
