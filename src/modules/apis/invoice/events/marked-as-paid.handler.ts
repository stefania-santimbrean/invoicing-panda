import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MarkedAsPaidEvent } from './marked-as-paid.event';

@EventsHandler(MarkedAsPaidEvent)
export class MarkedAsPaidHandler implements IEventHandler<MarkedAsPaidEvent> {
  async handle(event: MarkedAsPaidEvent): Promise<void> {
    if (event.paid) {
      console.log(
        `Email sent to bo$$ telling invoice number ${event.invoiceNr} was just paid`,
      ); // TODO: actually implement the email sending :D
    } else {
      console.log(
        `Email sent to bo$$ telling invoice number ${event.invoiceNr} was NOT paid`,
      ); // ideally we would need to check an invoice by date and mark them unpaid - or an admin would do that
    }
  }
}
