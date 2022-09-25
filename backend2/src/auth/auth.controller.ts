import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  AuthLoginRest,
  AuthResponseRest,
  AuthSignupRest,
} from './models/auth.model';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: AuthLoginRest })
  async login(@Body() req): Promise<AuthResponseRest> {
    return await this.authService.login(req.email.toLowerCase(), req.password);
  }

  @Post('signup')
  @ApiBody({ type: AuthSignupRest })
  async signup(@Body() req): Promise<AuthResponseRest> {
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
