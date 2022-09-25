import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsResolver } from './comments.resolver';

@Module({
  imports: [],
  providers: [CommentsResolver],
  controllers: [CommentsController],
})
export class CommentsModule {}
