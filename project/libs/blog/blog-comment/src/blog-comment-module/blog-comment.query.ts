import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';

import { SortDirection } from '@project/shared-core';

import { DefautCommentValue } from './blog-comment.constant';


export class BlogCommentQuery {
  @Transform(({ value }) => +value || DefautCommentValue.countLimit)
  @IsNumber()
  @IsOptional()
  public limit = DefautCommentValue.countLimit;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = DefautCommentValue.sortDirection;

  @Transform(({ value }) => +value || DefautCommentValue.pageCount)
  @IsOptional()
  public page: number = DefautCommentValue.pageCount;
}
