import { PrismaService } from 'nestjs-prisma';
import {
  Resolver,
  Args,
  Mutation,
  Query,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/models/user.model';
import {
  Comment,
  CommentAdd,
  CommentDelete,
  CommentEdit,
} from './models/comment.model';

@Resolver(() => Comment)
@UseGuards(GqlAuthGuard)
export class CommentsResolver {
  constructor(private prisma: PrismaService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Comment])
  async getUserComments(@UserEntity() user: User) {
    return await this.prisma.comment.findMany({
      where: { userId: user.id },
      include: { user: true },
    });
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Comment])
  async getPageComments(
    @UserEntity() user: User,
    @Args('pageId') pageId: string
  ) {
    return await this.prisma.comment.findMany({
      where: { pageId: pageId },
      include: { user: true },
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Comment)
  async addComment(@UserEntity() user: User, @Args() data: CommentAdd) {
    const { text, pageId } = data;
    const getPage = await this.prisma.page.findUnique({
      where: { id: pageId },
    });
    if (!getPage) throw new NotFoundException(`Page not Found`);
    return await this.prisma.comment.create({
      data: {
        text: text,
        user: { connect: { id: user.id } },
        page: { connect: { id: pageId } },
      },
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Comment)
  async editComment(@Args() data: CommentEdit) {
    const { text, id } = data;
    const getComment = await this.prisma.comment.update({
      where: { id: id },
      data: {
        text: text,
      },
    });
    if (!getComment) throw new NotFoundException(`Comment not Found`);
    return getComment;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Comment)
  async deleteComment(@Args() commentId: CommentDelete) {
    const getComment = await this.prisma.comment.findUnique({
      where: { id: commentId.id },
    });
    if (!getComment) throw new NotFoundException(`Comment not Found`);
    return await this.prisma.comment.delete({
      where: { id: commentId.id },
    });
  }

  @ResolveField('user', () => User)
  getCommentUser(@Parent() getPageComments: Comment) {
    return this.prisma.user.findUnique({
      where: { id: getPageComments.userId },
    });
  }
}
