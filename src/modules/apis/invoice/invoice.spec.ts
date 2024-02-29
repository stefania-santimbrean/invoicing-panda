// graphql.integration.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';

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

  it('should return the expected result for a GraphQL query', async () => {
    const query = `
      query {
        invoices {
            nr
            currency
            amount
      }
    }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    // Add assertions based on the expected result
    expect(response.body).toEqual({
      data: {
        invoices: [
          {
            nr: 1337,
            currency: 'RON',
            amount: 100,
          },
          {
            nr: 1338,
            currency: 'RON',
            amount: 200,
          },
        ],
      },
    });
  });

  // Add more tests for mutations, subscriptions, etc.
});
