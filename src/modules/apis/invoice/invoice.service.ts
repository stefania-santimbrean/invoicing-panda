import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../../../entities/invoice.entity';
import { Repository } from 'typeorm';
import { INVOICES_DATA } from '../../../../db/mock-data/seed-data';
export const invoice_not_found_error_message = (nr) =>
  `No invoice was found with number ${nr}`; // ideally this would be coming from an i18n file
@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
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
      throw new Error(invoice_not_found_error_message(nr));
      // check how to improve graphql error response and code
    }
    return value;
  }

  async seed() {
    await this.invoiceRepository
      .createQueryBuilder()
      .insert()
      .into(Invoice)
      .values(INVOICES_DATA)
      .execute();
  }
}
