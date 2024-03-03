import { AggregateRoot } from '@nestjs/cqrs';
import { MarkedAsPaidEvent } from '../modules/apis/invoice/events/marked-as-paid.event';

export class InvoiceModel extends AggregateRoot {
  constructor(
    nr: number,
    isStorno: boolean,
    stornoRef: number,
    currency: string,
    amount: number,
    date: Date,
    paid: boolean,
    customer: number,
    projects: number[],
  ) {
    super();
  }

  sendEmail(nr: number) {
    this.apply(new MarkedAsPaidEvent(nr));
  }
}
