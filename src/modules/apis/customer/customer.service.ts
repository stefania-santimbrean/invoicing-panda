import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../../../entities/customer.entity';
import { Project } from '../../../entities/project.entity';
import { Repository } from 'typeorm';
import {
  CUSTOMER_DATA,
  PROJECT_DATA,
} from '../../../../db/mock-data/seed-data';

export const customer_not_found_error_message = (nr) =>
  `No customer was found with number ${nr}`; // ideally this would be coming from an i18n file
@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async seed() {
    const project1 = new Project();
    project1.name = PROJECT_DATA[0].name;
    const project2 = new Project();
    project2.name = PROJECT_DATA[1].name;
    // check fi repository can be used for project and invoice before
    const customers = this.customerRepository.create([
      {
        ...CUSTOMER_DATA[0],
        projects: [project1, project2],
      },
      CUSTOMER_DATA[1],
    ]);

    await this.customerRepository.save(customers);
  }
}
