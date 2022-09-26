import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/rest-auth.guard';
import { UserEntityRest } from 'src/common/decorators/user.decorator';
import { MailSenderService } from './mail-sender.service';

@ApiTags('mail-sender')
@ApiBearerAuth()
@Controller('mail-sender')
@UseGuards(JwtAuthGuard)
@Controller()
export class MailSenderController {
  constructor(private readonly mailService: MailSenderService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async sendGeneralMail(@UserEntityRest() user: User) {
    const mail = await this.mailService.sendVerifyEmailMail(
      user.firstName,
      user.email,
      user.id
    );
    return mail;
  }
}
