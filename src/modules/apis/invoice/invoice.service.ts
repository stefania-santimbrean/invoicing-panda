import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../../../entities/invoice.entity';
import { Repository } from 'typeorm';
import { INVOICES_DATA } from '../../../../db/mock-data/seed-data';
import { CustomerService } from '../customer/customer.service';
export const invoice_not_found_error_message = (nr) =>
  `No invoice was found with number ${nr}`; // ideally this would be coming from an i18n file

// TODO: should refactor with cqrs queries

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly customerService: CustomerService,
  ) {}

  async getInvoices() {
    return await this.invoiceRepository.find({});
  }

  async getInvoice(nr) {
    const value = await this.invoiceRepository.findOne({
      where: {
        nr,
      },
    });
    if (!value) {
      throw new Error(invoice_not_found_error_message(nr));
      // check how to improve graphql error response and code
    }
    return value;
  }

  async create(
    invoice: Partial<Invoice>,
    customer: number,
    projects: number[],
  ) {
    const createdInvoice = await this.invoiceRepository
      .createQueryBuilder()
      .insert()
      .values({
        ...invoice,
        customer: {
          id: customer,
        },
      })
      .returning('*')
      .execute();

    await this.invoiceRepository
      .createQueryBuilder()
      .relation(Invoice, 'projects')
      .of(createdInvoice.raw[0].nr)
      .add(projects);

    return createdInvoice.raw[0]; // TODO: make it also return projects
  }

  // TODO: add also update

  async seed() {
    const customer = (await this.customerService.getCustomers())[0];
    for (const inv of INVOICES_DATA) {
      await this.create(
        inv,
        customer.id,
        customer.projects.map((p) => p.id),
      );
    }
  }
}
