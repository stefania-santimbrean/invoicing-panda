import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Invoice } from '../../../entities/invoice.entity';
import { InvoiceService } from './invoice.service';
import { InvoiceResolver } from './invoice.resolver';
import { MarkAsPaidHandler } from './commands/mark-as-paid.handler';
import { MarkedAsPaidHandler } from './events/marked-as-paid.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice]), CqrsModule],
  providers: [
    InvoiceService,
    InvoiceResolver,
    MarkAsPaidHandler,
    MarkedAsPaidHandler,
  ],
})
export class InvoiceModule {}
