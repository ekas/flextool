import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.modules';
import { AuthService } from '@services/auth.service';
import { AuthController } from '@controllers/auth.controller';
import { UserService } from '@services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entities/user.entity';

@Module({
  imports: [
    UserModule,
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService): any => ({
        secret: config.get<string>('SECRET_KEY'),
        signOptions: {
          expiresIn: config.get<string | number>('JWT_EXPIRY_TIME') || '30d',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, UserService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
