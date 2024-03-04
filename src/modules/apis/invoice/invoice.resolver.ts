import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InvoiceService } from './invoice.service';
import { CommandBus } from '@nestjs/cqrs';
import { MarkAsPaidCommand } from './commands/mark-as-paid.command';
import { CreateStornoCommand } from './commands/create-storno.command';
import { StatusValue } from '../../../shared/types/shared.types';
import { UpdateInvoiceCommand } from './commands/update-invoice.command';

@Resolver('Invoice')
export class InvoiceResolver {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly commandBus: CommandBus,
  ) {}

  @Query()
  async invoices() {
    return await this.invoiceService.getInvoices();
  }

  @Query()
  async invoice(@Args('nr') nr: string) {
    return await this.invoiceService.getInvoice(nr);
  }

  @Mutation()
  async create(
    @Args('currency') currency: string,
    @Args('amount') amount: number,
    @Args('date') date: Date,
    @Args('customer') customer: number,
    @Args('projects') projects: number[],
  ) {
    return this.invoiceService.create(
      {
        currency,
        date,
        amount,
      },
      customer,
      projects,
    );
  }

  @Mutation()
  async update(
    @Args('nr') nr: number,
    @Args('currency') currency: string,
    @Args('amount') amount: number,
    @Args('date') date: Date,
    @Args('customer') customer: number,
    @Args('projects') projects: number[],
  ) {
    const result = await this.commandBus.execute(
      new UpdateInvoiceCommand(nr, currency, amount, date, customer, projects),
    );
    if (result.status && result.status === StatusValue.failed) {
      throw new Error(result.message);
    } else {
      return result;
    }
  }

  @Mutation()
  async markAsPaid(@Args('nr') nr: number, @Args('paid') paid: boolean = true) {
    await this.commandBus.execute(new MarkAsPaidCommand(nr, paid));
    return paid;
  }

  @Mutation()
  async createStorno(@Args('nr') nr: number) {
    const { status, message } = await this.commandBus.execute(
      new CreateStornoCommand(nr),
    );
    if (status === StatusValue.success) {
      return true;
    } else {
      throw new Error(message);
    }
  }
}
