import { Module } from '@nestjs/common';
import { AppsController } from './apps.controller';
import { AppsResolver } from './apps.resolver';

@Module({
  imports: [],
  providers: [AppsResolver],
  controllers: [AppsController],
})
export class AppsModule {}
