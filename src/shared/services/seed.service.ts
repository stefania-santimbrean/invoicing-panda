import { Injectable } from '@nestjs/common';
import { InvoiceService } from '../../modules/apis/invoice/invoice.service';
import { CustomerService } from '../../modules/apis/customer/customer.service';

@Injectable()
export class SeedService {
  public constructor(
    private readonly invoiceService: InvoiceService,
    private readonly customerService: CustomerService,
  ) {}

  public async seed() {
    await this.customerService.seed();
    await this.invoiceService.seed();
  }
}
