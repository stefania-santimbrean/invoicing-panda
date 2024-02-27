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

  async getInvoice(nr) {
    const value = await this.invoiceRepository
      .createQueryBuilder('invoice')
      .where('invoice.nr = :nr', { nr: nr })
      .getOne();
    if (!value) {
      throw new Error(`No invoice was found with number ${nr}`); //add some i18n later aligator
      // check how to improve graphql error response and code
    }
    return value;
  }
}
