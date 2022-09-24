import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { JwtAuthGuard } from 'src/auth/rest-auth.guard';
import { UserEntityRest } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/models/user.model';
import { App } from './models/app.model';

@Controller('apps')
@UseGuards(JwtAuthGuard)
export class AppsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async userApps(@UserEntityRest() user: User): Promise<any> {
    return this.prisma.user.findUnique({ where: { id: user.id } }).App();
  }
}
