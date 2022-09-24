import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';
import { BaseModel } from 'src/common/models/base.model';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class App extends BaseModel {
  name: string;
  slug: string;
  isPublic: boolean;
  @Field((type) => GraphQLJSON)
  dataDefinition: JSON;
  user: User;
}
