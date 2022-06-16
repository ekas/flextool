import { IsString, IsOptional, IsNotEmpty, IsEmail } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  role: 'admin' | 'user' | 'operator';

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  token: string;
}

export class UserLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
