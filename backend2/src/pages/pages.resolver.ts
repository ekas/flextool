import { PrismaService } from 'nestjs-prisma';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/models/user.model';
import { Page } from './models/pages.model';
import { PageIdInput } from './args/page-id-input.model';

@Resolver(() => Page)
@UseGuards(GqlAuthGuard)
export class PagesResolver {
  constructor(private prisma: PrismaService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Page])
  async userPages(@UserEntity() user: User) {
    return this.prisma.user.findUnique({ where: { id: user.id } }).page();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Page)
  async userPageWithComponentData(
    @UserEntity() user: User,
    @Args() id: PageIdInput
  ) {
    return this.prisma.page.findUnique({
      where: { id: id.pageId },
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Page)
  async deletePage(@UserEntity() user: User, @Args() pageId: PageIdInput) {
    await this.prisma.comment.deleteMany({
      where: { pageId: pageId.pageId },
    });
    return await this.prisma.page.delete({
      where: { id: pageId.pageId },
    });
  }
}
