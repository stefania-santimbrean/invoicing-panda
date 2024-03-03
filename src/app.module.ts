import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Customer } from './entities/customer.entity';
import { InvoicingModule } from './modules/invoicing.module';
import { AppConfig, DbConfig } from './config';
import { SeedService } from './shared/services/seed.service';
import { InvoiceService } from './modules/apis/invoice/invoice.service';
import { Invoice } from './entities/invoice.entity';
import { CustomerService } from './modules/apis/customer/customer.service';
import { Project } from 'ts-morph';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AppConfig, DbConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Customer, Invoice, Project]),
    InvoicingModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService, InvoiceService, CustomerService],
})
export class AppModule {}
