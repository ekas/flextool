import { ArgsType, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@ObjectType()
export class Comment extends BaseModel {
  @IsNotEmpty()
  @ApiProperty({ default: 'My App comment' })
  text: string;

  @ApiProperty({ default: '1' })
  userId: string;

  @ApiProperty({ default: '1' })
  pageId: string;
}

@ArgsType()
export class CommentAdd {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  pageId: string;
}

@ArgsType()
export class CommentEdit {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  id: string;
}

@ArgsType()
export class CommentDelete {
  @IsNotEmpty()
  id: string;
}

export class CommentRest extends BaseModel {
  @ApiProperty({ default: 'My App comment' })
  text: string;

  @ApiProperty({ default: '1' })
  pageId: string;
}

export class CommentEditRest extends BaseModel {
  @ApiProperty({ default: '1' })
  id: string;

  @ApiProperty({ default: 'My App comment' })
  text: string;
}
