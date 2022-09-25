import { Module } from '@nestjs/common';
import { AppComponentResolver } from './apps_component.resolver';

@Module({
  imports: [],
  providers: [AppComponentResolver],
  controllers: [],
})
export class AppComponentModule {}
