import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateStornoCommand } from './create-storno.command';
import { Invoice } from '../../../../entities/invoice.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Status, StatusValue } from '../../../../shared/types/shared.types';
export const invoice_for_storno_not_found = (nr) =>
  `Cannot create storno for unexisting invoice with nr ${nr}`;
export const invoice_for_storno_exists = (nr) =>
  `Cannot create storno if one already exists for this invoice: ${nr}`;
@CommandHandler(CreateStornoCommand)
export class CreateStornoHandler
  implements ICommandHandler<CreateStornoCommand>
{
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly publisher: EventPublisher,
  ) {}
  async execute(command: CreateStornoCommand): Promise<Status> {
    const checkStornoExists = await this.invoiceRepository.find({
      where: {
        stornoRef: command.invoiceNr,
      },
    });
    if (checkStornoExists.length > 0) {
      return {
        status: StatusValue.failed,
        message: invoice_for_storno_exists(command.invoiceNr),
      };
    }
    const inv = await this.invoiceRepository.findOneBy({
      nr: command.invoiceNr,
    });
    if (!inv) {
      return {
        status: StatusValue.failed,
        message: invoice_for_storno_not_found(command.invoiceNr),
      };
    }
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

    // send storno invoice in rabbitmq to be read by some accounting systems like SAP stuff
    return {
      status: StatusValue.success,
    };
  }
}
