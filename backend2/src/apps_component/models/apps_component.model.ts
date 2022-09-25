import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class AppComponent extends BaseModel {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  @Field(() => GraphQLJSONObject)
  properties: JSON;
  appId?: string;
}
