import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getAllCustomers(): Promise<Customer[]> {
    return this.customerRepository.find();
  }
}
