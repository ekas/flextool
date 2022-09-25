import {
  Body,
  ConflictException,
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
    return await this.prisma.user.findUnique({ where: { id: user.id } }).page();
  }

  @Get(':pageId')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Page })
  async userPageWithComponentData(
    @UserEntityRest() user: User,
    @Param('pageId') pageId: string
  ) {
    return await this.prisma.page.findUnique({
      where: { id: pageId },
    });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Page })
  async createPage(@UserEntityRest() user: User, @Body() page: Page) {
    const findPageWithSameName = await this.prisma.page.findUnique({
      where: { name: page.name },
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
    return findPageWithSameName;
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Page })
  async editPage(@Body() page: Page) {
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

  @Delete(':pageId')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Page })
  async deletePage(
    @UserEntityRest() user: User,
    @Param('pageId') pageId: string
  ) {
    await this.prisma.comment.deleteMany({
      where: { pageId: pageId },
    });
    return await this.prisma.page.delete({
      where: { id: pageId },
    });
  }
}
