// graphql.integration.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';
import { invoice_not_found_error_message } from './invoice.service';
import { INVOICES_DATA } from '../../../../db/mock-data/seed-data';

describe('Invoice Integration Tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule, // Import your main application module
      ],
    }).compile();

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

  it('should have the first invoice nr eq to 1337', async () => {
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
    expect(minInvoiceNr).toEqual(1337);
  });

  it('look up an invoice via its number', async () => {
    const nr = 1337;
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

    expect(response.body.data.invoice.nr).toEqual(1337);
  });

  it('look up an invoice via its number and not find it', async () => {
    const nr = 1336;
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
});
