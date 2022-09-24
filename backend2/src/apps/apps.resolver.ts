import { PrismaService } from 'nestjs-prisma';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { App } from './models/app.model';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/models/user.model';

@Resolver(() => App)
@UseGuards(GqlAuthGuard)
export class AppsResolver {
  constructor(private prisma: PrismaService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [App])
  async userApps(@UserEntity() user: User) {
    return this.prisma.user.findUnique({ where: { id: user.id } }).App();
  }

  // @ResolveField('posts')
  // posts(@Parent() author: User) {
  //   return this.prisma.user.findUnique({ where: { id: author.id } }).posts();
  // }
}
