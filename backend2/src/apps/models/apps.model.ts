import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { GraphQLJSONObject } from 'graphql-type-json';
import { ApiProperty } from '@nestjs/swagger';
import { AppComponent } from 'src/apps_component/models/apps_component.model';

@ObjectType()
export class App extends BaseModel {
  @ApiProperty({ default: 'My App' })
  name: string;

  @ApiProperty({ default: 'my-app' })
  slug?: string;

  @ApiProperty({ default: true })
  isPublic?: boolean;

  @ApiProperty({ default: { foo: 'bar' } })
  @Field(() => GraphQLJSONObject)
  data?: JSON;

  @ApiProperty({ default: '1' })
  userId?: string;

  appComponent?: AppComponent;
}
