import { Transform } from 'class-transformer';
import { IsString, IsIn, IsNumber, IsOptional } from 'class-validator';

import { PostStatusType, PostType, SortDirection, SortField } from '@project/shared-core';

import {
  DEFAULT_POST_COUNT_LIMIT,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_PAGE_COUNT,
  DEFAULT_SORT
} from './blog-post.constant';


export class BlogPostQuery {
  @Transform(({ value }) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_POST_COUNT_LIMIT;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT;

  @Transform(({ value }) =>
    typeof value === 'string'
      ? value.split(',').filter((tag) => tag.trim() !== '')
      : value
  )
  @IsString({ each: true })
  @IsOptional()
  public tags?: string[];

  @IsOptional()
  public sort?: SortField = DEFAULT_SORT;

  @IsOptional()
  public type?: PostType;

  @IsOptional()
  public filter?: PostStatusType = PostStatusType.Published;
}
