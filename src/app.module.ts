import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Customer } from './model/customer.entity';
import { Invoice } from './model/invoice.entity';
import { Project } from './model/project.entity';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
