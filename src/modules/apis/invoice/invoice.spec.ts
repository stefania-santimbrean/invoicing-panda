// graphql.integration.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';
import { invoice_not_found_error_message } from './invoice.service';
import { INVOICES_DATA } from '../../../../db/mock-data/seed-data';
import { CustomerService } from '../customer/customer.service';
const FIRST_INVOICE_NR = 1337;

describe('Invoice Integration Tests', () => {
  let app: INestApplication;
  let customerService: CustomerService;

  beforeAll(async () => {
    jest.setTimeout(200000);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule, // Import your main application module
      ],
    }).compile();

    customerService = await moduleFixture.resolve(CustomerService);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should retrieve and list all invoices in the system', async () => {
    const query = `
      query {
        invoices {
          isStorno
          currency
          amount
          date
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    const invoices = INVOICES_DATA.map((inv) => ({
      ...inv,
      date: inv.date.getTime(),
    }));

    expect(response.body).toEqual({
      data: {
        invoices,
      },
    });
  });

  it(`should have the first invoice nr eq to ${FIRST_INVOICE_NR}`, async () => {
    const query = `
      query {
        invoices {
          nr
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    const minInvoiceNr = Math.min(
      ...response.body.data.invoices.map((invoice) => invoice.nr),
    );
    expect(minInvoiceNr).toEqual(FIRST_INVOICE_NR);
  });

  it('look up an invoice via its number', async () => {
    const query = `
      query {
        invoice(nr: ${FIRST_INVOICE_NR}) {
          nr
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    expect(response.body.data.invoice.nr).toEqual(FIRST_INVOICE_NR);
  });

  it('look up an invoice via its number and not find it', async () => {
    const nr = FIRST_INVOICE_NR - 1;
    const query = `
      query {
        invoice(nr: ${nr}) {
          nr
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    expect(response.body.errors[0].message).toEqual(
      invoice_not_found_error_message(nr),
    );
  });

  it('create an invoice in the system', async () => {
    const customers = await customerService.getCustomers();
    const TO_CREATE = {
      isStorno: false,
      currency: 'ron',
      date: Date.now(),
      amount: 300,
      customer: customers[0].id,
      projects: customers[0].projects.map((p) => p.id),
    };

    const mutation = `
      mutation {
        create (isStorno: ${TO_CREATE.isStorno}, currency: "${TO_CREATE.currency}", date: ${TO_CREATE.date}, amount: ${TO_CREATE.amount}, customer: ${TO_CREATE.customer}, projects: [${TO_CREATE.projects}]) {
          nr
          isStorno
          currency
          amount
        }
      }
    `; // add also query for customer and projects

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('content-type', 'application/json')
      .send({ query: mutation })
      .expect(200);

    expect(response.body).toEqual({
      data: {
        create: {
          nr: FIRST_INVOICE_NR + 3, // because i know i inserted 3 invoices with seed service
          isStorno: TO_CREATE.isStorno,
          currency: TO_CREATE.currency,
          amount: TO_CREATE.amount,
        },
      },
    });
  });

  it('mark an invoice as being paid', async () => {
    const mutation = `
      mutation {
        markAsPaid (nr: ${FIRST_INVOICE_NR}) 
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('content-type', 'application/json')
      .send({ query: mutation })
      .expect(200);

    expect(response.body).toEqual({
      data: {
        markAsPaid: true,
      },
    });
  });

  it('mark an invoice as being unpaid', async () => {
    const mutation = `
      mutation {
        markAsPaid (nr: ${FIRST_INVOICE_NR}, paid: false) 
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('content-type', 'application/json')
      .send({ query: mutation })
      .expect(200);

    expect(response.body).toEqual({
      data: {
        markAsPaid: false,
      },
    });
  });
});
