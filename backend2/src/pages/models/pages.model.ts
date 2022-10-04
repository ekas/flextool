import { ArgsType, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@ObjectType()
export class Page extends BaseModel {
  @ApiProperty({ default: 'My App' })
  name: string;

  @ApiProperty({ default: 'my-app' })
  slug?: string;

  @ApiProperty({ default: true })
  isPublic?: boolean;

  @ApiProperty({ default: { foo: 'bar' } })
  definition?: string;

  @ApiProperty({ default: '1' })
  userId?: string;
}

@ArgsType()
export class PageArgs extends BaseModel {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  slug?: string;

  @IsNotEmpty()
  isPublic?: boolean;

  @IsNotEmpty()
  definition?: string;
}

@ArgsType()
export class PageEditArgs extends BaseModel {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  isPublic?: boolean;

  @IsNotEmpty()
  definition?: string;
}
