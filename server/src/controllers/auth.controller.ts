import { UserDto, UserLoginDto, UserResponseDto } from '@dto/user.dto';
import { JwtStrategy } from '@modules/auth/jwt.strategy';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '@services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({
    status: 200,
    description: 'User Logged in Successfully',
    type: UserResponseDto,
  })
  @ApiBody({
    description: 'User Data',
    type: UserLoginDto,
  })
  @UseGuards(JwtStrategy)
  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.logIn(userLoginDto.email, userLoginDto.password);
  }

  @ApiOperation({ summary: 'User Signup' })
  @ApiResponse({
    status: 200,
    description: 'User created Successfully',
    type: UserResponseDto,
  })
  @ApiBody({
    description: 'User Data',
    type: UserDto,
  })
  @UseGuards(JwtStrategy)
  @Post('logup')
  async logup(@Body() userDto: UserDto) {
    return this.authService.logUp(userDto);
  }
}
