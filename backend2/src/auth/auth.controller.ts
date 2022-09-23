import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Auth } from './models/auth.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: Auth })
  async login(@Body() req) {
    const { accessToken, refreshToken } = await this.authService.login(
      req.email.toLowerCase(),
      req.password
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  @Post('signup')
  @ApiBody({ type: Auth })
  async signup(@Body() req) {
    req.email = req.email.toLowerCase();
    const { accessToken, refreshToken } = await this.authService.createUser(
      req
    );
    return {
      accessToken,
      refreshToken,
    };
  }
}
