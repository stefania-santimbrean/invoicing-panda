import { Injectable } from '@nestjs/common';
import { InvoiceService } from '../../modules/apis/invoice/invoice.service';

@Injectable()
export class SeedService {
  public constructor(private readonly invoiceService: InvoiceService) {}

  public async seed() {
    await this.invoiceService.seed();
  }
}
