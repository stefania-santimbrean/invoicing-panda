import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { MarkAsPaidCommand } from './mark-as-paid.command';
import { Invoice } from '../../../../entities/invoice.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceModel } from '../../../../models/invoice.model';

@CommandHandler(MarkAsPaidCommand)
export class MarkAsPaidHandler implements ICommandHandler<MarkAsPaidCommand> {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly publisher: EventPublisher,
  ) {}
  async execute(command: MarkAsPaidCommand): Promise<void> {
    const updated = await this.invoiceRepository
      .createQueryBuilder()
      .update(Invoice)
      .set({ paid: command.paid })
      .where({ nr: command.invoiceNr })
      .returning('*')
      .execute();
    const invoice = this.publisher.mergeObjectContext(
      new InvoiceModel(updated.raw[0]),
    );
    invoice.sendEmail(command.invoiceNr, command.paid);
  }
}
