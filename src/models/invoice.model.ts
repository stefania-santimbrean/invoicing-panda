import { AggregateRoot } from '@nestjs/cqrs';
import { MarkedAsPaidEvent } from '../modules/apis/invoice/events/marked-as-paid.event';
import { Invoice } from '../entities/invoice.entity';

export class InvoiceModel extends AggregateRoot {
  constructor(invoice: Invoice) {
    super();
    this.autoCommit = true;
  }

  sendEmail(nr: number, paid: boolean) {
    this.apply(new MarkedAsPaidEvent(nr, paid));
  }
}
