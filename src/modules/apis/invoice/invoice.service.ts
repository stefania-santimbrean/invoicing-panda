import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from 'src/entities/invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository,
  ) {}

  async getInvoices() {
    return await this.invoiceRepository.find({});
  }

  async getInvoice(id) {
    return await this.invoiceRepository.findOneBy({
      id: id,
    });
  }
}
