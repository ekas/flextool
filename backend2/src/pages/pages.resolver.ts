import { PrismaService } from 'nestjs-prisma';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import {
  ConflictException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/models/user.model';
import { Page, PageArgs, PageEditArgs } from './models/pages.model';
import { PageIdInput } from './args/page-id-input.model';

@Resolver(() => Page)
@UseGuards(GqlAuthGuard)
export class PagesResolver {
  constructor(private prisma: PrismaService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Page])
  async userPages(@UserEntity() user: User) {
    return await this.prisma.user.findUnique({ where: { id: user.id } }).page();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Page)
  async userPageWithComponentData(
    @UserEntity() user: User,
    @Args() id: PageIdInput
  ) {
    return await this.prisma.page.findUnique({
      where: { id: id.pageId },
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Page)
  async createPage(@UserEntity() user: User, @Args() page: PageArgs) {
    const findPageWithSameName = await this.prisma.page.findFirst({
      where: { name: page.name, userId: user.id },
    });
    if (findPageWithSameName)
      throw new ConflictException(`Page with name ${page.name.trim()} exist`);
    return await this.prisma.page.create({
      data: {
        name: page.name,
        user: { connect: { id: user.id } },
        isPublic: page.isPublic,
        slug: page.slug,
        definition: page.definition,
      },
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Page)
  async editPage(@UserEntity() user: User, @Args() page: PageEditArgs) {
    const getPage = await this.prisma.page.update({
      where: { id: page.id },
      data: {
        name: page.name,
        isPublic: page.isPublic,
        definition: page.definition,
      },
    });
    if (!getPage) throw new NotFoundException(`Page not Found`);
    return getPage;
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
