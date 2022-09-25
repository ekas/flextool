import { Module } from '@nestjs/common';
import { PagesController } from './pages.controller';
import { PagesResolver } from './pages.resolver';

@Module({
  imports: [],
  providers: [PagesResolver],
  controllers: [PagesController],
})
export class PagesModule {}
