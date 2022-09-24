import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';
import { BaseModel } from 'src/common/models/base.model';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class App extends BaseModel {
  name: string;
  slug: string;
  isPublic: boolean;
  data: string;
}
