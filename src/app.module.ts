import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Customer } from './entities/customer.entity';
import { Invoice } from './entities/invoice.entity';
import { Project } from './entities/project.entity';
import { InvoicingModule } from './modules/invoicing.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Customer, Invoice, Project],
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Customer]),
    InvoicingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
