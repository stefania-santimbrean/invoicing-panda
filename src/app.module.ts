import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Customer } from './entities/customer.entity';
import { InvoicingModule } from './modules/invoicing.module';
import { AppConfig, DbConfig } from './config';

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
    TypeOrmModule.forFeature([Customer]),
    InvoicingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
