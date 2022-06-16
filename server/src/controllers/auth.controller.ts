import { UserDto, UserLoginDto } from '@dto/user.dto';
import { JwtStrategy } from '@modules/auth/jwt.strategy';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '@services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtStrategy)
  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.logIn(userLoginDto.email, userLoginDto.password);
  }

  @UseGuards(JwtStrategy)
  @Post('logup')
  async logup(@Body() userDto: UserDto) {
    return this.authService.logUp(userDto);
  }
}
