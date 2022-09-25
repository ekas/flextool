import { ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { User } from 'src/users/models/user.model';
import { Token } from './token.model';

@ObjectType()
export class Auth extends Token {
  user: User;
}

export class AuthSignupRest {
  @ApiProperty({ default: 'Alan' })
  firstName: string;

  @ApiProperty({ default: 'John' })
  lastName: string;

  @ApiProperty({ default: 'alanjohn83@gmail.com' })
  email: string;

  @ApiProperty({ enum: ['ADMIN', 'DEVELOPER', 'OPERATOR'] })
  role: Role;

  @ApiProperty({ default: 'password' })
  password: string;
}

export class AuthLoginRest {
  @ApiProperty({ default: 'john.doe@gmail.com' })
  email: string;

  @ApiProperty({ default: 'secretJohn32' })
  password: string;
}

export class AuthResponseRest {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
