import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { UpdateInvoiceCommand } from './update-invoice.command';
import { Invoice } from '../../../../entities/invoice.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Status, StatusValue } from '../../../../shared/types/shared.types';

@CommandHandler(UpdateInvoiceCommand)
export class UpdateInvoiceHandler
  implements ICommandHandler<UpdateInvoiceCommand>
{
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly publisher: EventPublisher,
  ) {}
  async execute(command: UpdateInvoiceCommand): Promise<Invoice | Status> {
    let invoiceToUpdate: any = {
      currency: command.currency,
      amount: command.amount,
      date: command.date,
    };
    if (command.customer) {
      invoiceToUpdate = {
        ...invoiceToUpdate,
        customer: { id: command.customer },
      };
      if (!command.projects) {
        return {
          status: StatusValue.failed,
          message: 'You must specify a project for this changed customer',
        };
      }
    }
    const updated = await this.invoiceRepository
      .createQueryBuilder()
      .update(Invoice)
      .set(invoiceToUpdate)
      .where({ nr: command.nr })
      .returning('*')
      .execute();
    if (command.projects) {
      const dbProjects = (
        await this.invoiceRepository
          .createQueryBuilder()
          .relation(Invoice, 'projects')
          .of(command.nr)
          .loadMany()
      ).map((p) => p.id);
      if (command.projects.length > dbProjects.length) {
        const projectToAdd = command.projects.filter(
          (p) => !dbProjects.includes(p),
        );
        await this.invoiceRepository
          .createQueryBuilder()
          .relation(Invoice, 'projects')
          .of(command.nr)
          .add(projectToAdd);
      } else if (dbProjects.length > command.projects.length) {
        const projecToRemove = dbProjects.filter(
          (p) => !command.projects.includes(p),
        );
        await this.invoiceRepository
          .createQueryBuilder()
          .relation(Invoice, 'projects')
          .of(command.nr)
          .remove(projecToRemove);
      }
    }
    return updated.raw[0];
  }
}
