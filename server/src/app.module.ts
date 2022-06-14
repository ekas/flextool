import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { databaseOrmConfig } from 'databaseOrmConfig';

@Module({
  imports: [TypeOrmModule.forRoot(databaseOrmConfig())],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
