import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { PasswordService } from './password.service';
import { GqlAuthGuard } from './gql-auth.guard';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';
import { SecurityConfig } from 'src/common/configs/config.interface';
import { AuthController } from './auth.controller';
import { MailSenderModule } from 'src/mail-sender/mail-sender.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security');
        return {
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: securityConfig.expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
    MailSenderModule,
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    GqlAuthGuard,
    PasswordService,
  ],
  controllers: [AuthController],
  exports: [GqlAuthGuard],
})
export class AuthModule {}
