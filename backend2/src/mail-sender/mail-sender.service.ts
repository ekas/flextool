import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { MailConfig, ProjectConfig } from 'src/common/configs/config.interface';

import {
  changeMail,
  changePasswordInfo,
  confirmMail,
  resetPassword,
} from './templates';

@Injectable()
export class MailSenderService {
  private transporter: Mail;

  private socials: string;

  private logger = new Logger('MailSenderService');

  constructor(readonly configService: ConfigService) {
    const mailConfig = configService.get<MailConfig>('mail');
    const projectConfig = configService.get<ProjectConfig>('project');

    this.transporter = createTransport({
      auth: {
        user: mailConfig.service.user,
        pass: mailConfig.service.pass,
      },
      host: mailConfig.service.host,
      port: mailConfig.service.port,
      secure: mailConfig.service.secure,
    });
    this.socials = projectConfig.socials
      .map(
        (social) =>
          `<a href="${social[1]}" style="box-sizing:border-box;color:${projectConfig.color};font-weight:400;text-decoration:none;font-size:12px;padding:0 5px" target="_blank">${social[0]}</a>`
      )
      .join('');
  }

  async sendVerifyEmailMail(
    name: string,
    email: string,
    token: string
  ): Promise<boolean> {
    const mailConfig = this.configService.get<MailConfig>('mail');
    const projectConfig = this.configService.get<ProjectConfig>('project');
    const buttonLink = `${projectConfig.mailVerificationUrl}?token=${token}`;

    const mail = confirmMail
      .replace(new RegExp('--PersonName--', 'g'), name)
      .replace(new RegExp('--ProjectName--', 'g'), projectConfig.name)
      .replace(new RegExp('--ProjectAddress--', 'g'), projectConfig.address)
      .replace(new RegExp('--ProjectLogo--', 'g'), projectConfig.logoUrl)
      .replace(new RegExp('--ProjectSlogan--', 'g'), projectConfig.slogan)
      .replace(new RegExp('--ProjectColor--', 'g'), projectConfig.color)
      .replace(new RegExp('--ProjectLink--', 'g'), projectConfig.url)
      .replace(new RegExp('--Socials--', 'g'), this.socials)
      .replace(new RegExp('--ButtonLink--', 'g'), buttonLink)
      .replace(
        new RegExp('--TermsOfServiceLink--', 'g'),
        projectConfig.termsOfServiceUrl
      );

    const mailOptions = {
      from: `"${mailConfig.senderCredentials.name}" <${mailConfig.senderCredentials.email}>`,
      to: email, // list of receivers (separated by ,)
      subject: `Welcome to ${projectConfig.name} ${name}! Confirm Your Email`,
      html: mail,
    };

    return new Promise<boolean>((resolve) =>
      this.transporter.sendMail(mailOptions, async (error) => {
        if (error) {
          this.logger.warn(
            'Mail sending failed, check your service credentials.'
          );
          resolve(false);
        }
        resolve(true);
      })
    );
  }

  async sendChangeEmailMail(
    name: string,
    email: string,
    token: string
  ): Promise<boolean> {
    const mailConfig = this.configService.get<MailConfig>('mail');
    const projectConfig = this.configService.get<ProjectConfig>('project');
    const buttonLink = `${projectConfig.mailChangeUrl}?token=${token}`;

    const mail = changeMail
      .replace(new RegExp('--PersonName--', 'g'), name)
      .replace(new RegExp('--ProjectName--', 'g'), projectConfig.name)
      .replace(new RegExp('--ProjectAddress--', 'g'), projectConfig.address)
      .replace(new RegExp('--ProjectLogo--', 'g'), projectConfig.logoUrl)
      .replace(new RegExp('--ProjectSlogan--', 'g'), projectConfig.slogan)
      .replace(new RegExp('--ProjectColor--', 'g'), projectConfig.color)
      .replace(new RegExp('--ProjectLink--', 'g'), projectConfig.url)
      .replace(new RegExp('--Socials--', 'g'), this.socials)
      .replace(new RegExp('--ButtonLink--', 'g'), buttonLink);

    const mailOptions = {
      from: `"${mailConfig.senderCredentials.name}" <${mailConfig.senderCredentials.email}>`,
      to: email, // list of receivers (separated by ,)
      subject: `Change Your ${projectConfig.name} Account's Email`,
      html: mail,
    };

    return new Promise<boolean>((resolve) =>
      this.transporter.sendMail(mailOptions, async (error) => {
        if (error) {
          this.logger.warn(
            'Mail sending failed, check your service credentials.'
          );
          resolve(false);
        }
        resolve(true);
      })
    );
  }

  async sendResetPasswordMail(
    name: string,
    email: string,
    token: string
  ): Promise<boolean> {
    const mailConfig = this.configService.get<MailConfig>('mail');
    const projectConfig = this.configService.get<ProjectConfig>('project');
    const buttonLink = `${projectConfig.resetPasswordUrl}?token=${token}`;

    const mail = resetPassword
      .replace(new RegExp('--PersonName--', 'g'), name)
      .replace(new RegExp('--ProjectName--', 'g'), projectConfig.name)
      .replace(new RegExp('--ProjectAddress--', 'g'), projectConfig.address)
      .replace(new RegExp('--ProjectLogo--', 'g'), projectConfig.logoUrl)
      .replace(new RegExp('--ProjectSlogan--', 'g'), projectConfig.slogan)
      .replace(new RegExp('--ProjectColor--', 'g'), projectConfig.color)
      .replace(new RegExp('--ProjectLink--', 'g'), projectConfig.url)
      .replace(new RegExp('--Socials--', 'g'), this.socials)
      .replace(new RegExp('--ButtonLink--', 'g'), buttonLink);

    const mailOptions = {
      from: `"${mailConfig.senderCredentials.name}" <${mailConfig.senderCredentials.email}>`,
      to: email, // list of receivers (separated by ,)
      subject: `Reset Your ${projectConfig.name} Account's Password`,
      html: mail,
    };

    return new Promise<boolean>((resolve) =>
      this.transporter.sendMail(mailOptions, async (error) => {
        if (error) {
          this.logger.warn(
            'Mail sending failed, check your service credentials.'
          );
          resolve(false);
        }
        resolve(true);
      })
    );
  }

  async sendPasswordChangeInfoMail(
    name: string,
    email: string
  ): Promise<boolean> {
    const mailConfig = this.configService.get<MailConfig>('mail');
    const projectConfig = this.configService.get<ProjectConfig>('project');
    const buttonLink = projectConfig.url;
    const mail = changePasswordInfo
      .replace(new RegExp('--PersonName--', 'g'), name)
      .replace(new RegExp('--ProjectName--', 'g'), projectConfig.name)
      .replace(new RegExp('--ProjectAddress--', 'g'), projectConfig.address)
      .replace(new RegExp('--ProjectLogo--', 'g'), projectConfig.logoUrl)
      .replace(new RegExp('--ProjectSlogan--', 'g'), projectConfig.slogan)
      .replace(new RegExp('--ProjectColor--', 'g'), projectConfig.color)
      .replace(new RegExp('--ProjectLink--', 'g'), projectConfig.url)
      .replace(new RegExp('--Socials--', 'g'), this.socials)
      .replace(new RegExp('--ButtonLink--', 'g'), buttonLink);

    const mailOptions = {
      from: `"${mailConfig.senderCredentials.name}" <${mailConfig.senderCredentials.email}>`,
      to: email, // list of receivers (separated by ,)
      subject: `Your ${projectConfig.name} Account's Password is Changed`,
      html: mail,
    };

    return new Promise<boolean>((resolve) =>
      this.transporter.sendMail(mailOptions, async (error) => {
        if (error) {
          this.logger.warn(
            'Mail sending failed, check your service credentials.'
          );
          resolve(false);
        }
        resolve(true);
      })
    );
  }
}
