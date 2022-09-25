import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'nestjs-prisma';
import { JwtAuthGuard } from 'src/auth/rest-auth.guard';
import { UserEntityRest } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/models/user.model';
import { Page } from './models/pages.model';

@ApiTags('apps')
@ApiBearerAuth()
@Controller('apps')
@UseGuards(JwtAuthGuard)
export class PagesController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: [Page] })
  async userApps(@UserEntityRest() user: User) {
    return this.prisma.user.findUnique({ where: { id: user.id } }).page();
  }
}
