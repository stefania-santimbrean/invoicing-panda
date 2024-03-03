import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CqrsModule } from '@nestjs/cqrs';
import { join } from 'path';
import { InvoiceModule } from './apis/invoice/invoice.module';
import { DateScalar } from '../shared/scalars/date-scalar.class';

@Module({
  imports: [
    CqrsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
    }),
    InvoiceModule,
  ],
  controllers: [],
  providers: [DateScalar],
})
export class InvoicingModule {}
