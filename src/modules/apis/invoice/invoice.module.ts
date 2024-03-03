import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Invoice } from '../../../entities/invoice.entity';
import { InvoiceService } from './invoice.service';
import { InvoiceResolver } from './invoice.resolver';
import { MarkAsPaidHandler } from './commands/mark-as-paid.handler';
import { MarkedAsPaidHandler } from './events/marked-as-paid.handler';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../../../entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, Customer]), CqrsModule],
  providers: [
    InvoiceService,
    CustomerService,
    InvoiceResolver,
    MarkAsPaidHandler,
    MarkedAsPaidHandler,
  ],
})
export class InvoiceModule {}
