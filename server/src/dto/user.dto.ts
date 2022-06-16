import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsEmail } from 'class-validator';

export class UserDto {
  @ApiProperty({ default: 'Alan' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ default: 'John' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ enum: ['admin', 'operator', 'User'] })
  @IsString()
  @IsNotEmpty()
  role: 'admin' | 'user' | 'operator';

  @ApiProperty({ default: 'alanjohn83@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  token: string;
}

export class UserLoginDto {
  @ApiProperty({ default: 'alanjohn83@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UserResponseDto {
  id: string;

  @ApiProperty({ default: 'Alan' })
  firstName: string;

  @ApiProperty({ default: 'John' })
  lastName: string;

  @ApiProperty({ default: 'alanjohn83@gmail.com' })
  email: string;

  avatarId?: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ enum: ['admin', 'operator', 'User'] })
  role: 'admin' | 'user' | 'operator';

  createdAt: Date;
  updatedAt: Date;
  access_token?: string;
}
