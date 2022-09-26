import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'nestjs-prisma';
import { JwtAuthGuard } from 'src/auth/rest-auth.guard';
import { UserEntityRest } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/models/user.model';
import { Comment, CommentEditRest, CommentRest } from './models/comment.model';

@ApiTags('comments')
@ApiBearerAuth()
@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: [Comment] })
  async getUserComments(@UserEntityRest() user: User) {
    return await this.prisma.comment.findMany({
      where: { userId: user.id },
      include: { user: true },
    });
  }

  @Get(':pageId')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: [Comment] })
  async getPageComments(@Param('pageId') pageId: string) {
    return await this.prisma.comment.findMany({
      where: { pageId: pageId },
      include: { user: true },
    });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Comment })
  async addComment(@UserEntityRest() user: User, @Body() data: CommentRest) {
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

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Comment })
  async editComment(@Body() data: CommentEditRest) {
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

  @Delete(':commentId')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Comment })
  async deleteComment(@Param('commentId') commentId: string) {
    const getComment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!getComment) throw new NotFoundException(`Comment not Found`);
    return await this.prisma.comment.delete({
      where: { id: commentId },
    });
  }
}
