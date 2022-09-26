import { Module } from '@nestjs/common';
import { MailSenderController } from './mail-sender.controller';
import { MailSenderService } from './mail-sender.service';

@Module({
  providers: [MailSenderService],
  exports: [MailSenderService],
  controllers: [MailSenderController],
})
export class MailSenderModule {}
