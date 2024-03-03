import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { MarkAsPaidCommand } from './mark-as-paid.command';
import { Invoice } from '../../../../entities/invoice.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(MarkAsPaidCommand)
export class MarkAsPaidHandler implements ICommandHandler<MarkAsPaidCommand> {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly publisher: EventPublisher,
  ) {}
  async execute(command: MarkAsPaidCommand): Promise<void> {
    const updated = await this.invoiceRepository.update(
      { paid: true },
      { nr: command.invoiceNr },
    );
    const invoice = this.publisher.mergeObjectContext(updated.raw);
    invoice.sendEmail(command.invoiceNr);
  }
}
