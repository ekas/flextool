import { IsString, IsOptional, IsNotEmpty, IsEmail } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  last_name: string;

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
  @IsNotEmpty()
  token: string;
}
