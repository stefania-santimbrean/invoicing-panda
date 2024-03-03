import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateStornoCommand } from './create-storno.command';
import { Invoice } from '../../../../entities/invoice.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceModel } from '../../../../models/invoice.model';

@CommandHandler(CreateStornoCommand)
export class CreateStornoHandler
  implements ICommandHandler<CreateStornoCommand>
{
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly publisher: EventPublisher,
  ) {}
  async execute(command: CreateStornoCommand): Promise<void> {
    const inv = await this.invoiceRepository.findOneBy({
      nr: command.invoiceNr,
    });
    const storno = await this.invoiceRepository
      .createQueryBuilder()
      .insert()
      .values({
        isStorno: true,
        stornoRef: inv.nr,
        currency: inv.currency,
        amount: -inv.amount,
        date: new Date(), // could also be coming from user input
        paid: false, // since it's newly created, must not be yet paid
        customer: {
          id: inv.customer.id,
        },
      })
      .returning('*')
      .execute();

    await this.invoiceRepository
      .createQueryBuilder()
      .relation(Invoice, 'projects')
      .of(storno.raw[0].nr)
      .add(inv.projects);

    const invoice = this.publisher.mergeObjectContext(
      new InvoiceModel(storno.raw[0]),
    );
    // send storno invoice in rabbitmq to be read by some accounting systems like SAP stuff
  }
}
