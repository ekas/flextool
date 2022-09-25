import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/rest-auth.guard';
import { UserEntityRest } from 'src/common/decorators/user.decorator';
import { UserRest } from './models/user.model';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@UserEntityRest() user: UserRest): Promise<UserRest> {
    return user;
  }
}
