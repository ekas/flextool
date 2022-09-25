import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { JwtAuthGuard } from 'src/auth/rest-auth.guard';
import { UserEntityRest } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/models/user.model';
import { Page } from './models/pages.model';

@ApiTags('pages')
@ApiBearerAuth()
@Controller('pages')
@UseGuards(JwtAuthGuard)
export class PagesController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: [Page] })
  async userApps(@UserEntityRest() user: User) {
    return this.prisma.user.findUnique({ where: { id: user.id } }).page();
  }

  @Get(':pageId')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Page })
  async userPageWithComponentData(
    @UserEntityRest() user: User,
    @Param('pageId') pageId: string
  ) {
    return this.prisma.page.findUnique({
      where: { id: pageId },
    });
  }

  @Delete(':pageId')
  @UseGuards(JwtAuthGuard)
  async deletePage(
    @UserEntityRest() user: User,
    @Param('pageId') pageId: string
  ) {
    await this.prisma.comment.deleteMany({
      where: { pageId: pageId },
    });
    return this.prisma.page.delete({
      where: { id: pageId },
    });
  }
}
