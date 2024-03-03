import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InvoiceService } from './invoice.service';

@Resolver('Invoice')
export class InvoiceResolver {
  constructor(private readonly invoiceService: InvoiceService) {}

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
}
