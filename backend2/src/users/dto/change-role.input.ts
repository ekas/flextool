import { Field, InputType } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ChangeRoleInput {
  @Field()
  @IsNotEmpty()
  role: Role;

  @Field()
  @IsNotEmpty()
  email: string;
}
