import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { databaseOrmConfig } from 'databaseOrmConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['../.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseOrmConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
