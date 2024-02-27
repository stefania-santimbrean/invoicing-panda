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
  async invoice(@Args('id') id: string) {
    return await this.invoiceService.getInvoice(id);
  }

  @Mutation()
  async create(
    @Args('isStorno') isStorno: Boolean,
    @Args('currency') currency: Number,
    @Args('amount') amount: Number,
  ) {}
}
