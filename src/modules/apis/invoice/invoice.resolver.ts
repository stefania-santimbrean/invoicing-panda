import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InvoiceService } from './invoice.service';
import { CommandBus } from '@nestjs/cqrs';
import { MarkAsPaidCommand } from './commands/mark-as-paid.command';
import { CreateStornoCommand } from './commands/create-storno.command';
import { StatusValue } from '../../../shared/types/shared.types';

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
    @Args('isStorno') isStorno: boolean,
    @Args('currency') currency: string,
    @Args('date') date: Date,
    @Args('amount') amount: number,
    @Args('customer') customer: number,
    @Args('projects') projects: number[],
  ) {
    return this.invoiceService.create(
      {
        isStorno,
        currency,
        date,
        amount,
      },
      customer,
      projects,
    );
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
