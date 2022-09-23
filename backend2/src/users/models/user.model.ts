import {
  ObjectType,
  registerEnumType,
  HideField,
  Field,
} from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});

@ObjectType()
export class User extends BaseModel {
  email: string;
  firstName?: string;
  lastName?: string;
  @Field(() => Role)
  role: Role;
  @HideField()
  password: string;
}

export class UserRest {
  id: string;

  @ApiProperty({ default: 'Alan' })
  firstName: string;

  @ApiProperty({ default: 'John' })
  lastName: string;

  @ApiProperty({ default: 'alanjohn83@gmail.com' })
  email: string;

  @ApiProperty({ enum: ['ADMIN', 'DEVELOPER', 'OPERATOR'] })
  role: Role;

  @Exclude()
  password: string;
}
