import { Transform } from 'class-transformer';
import { IsString, IsIn, IsNumber, IsOptional } from 'class-validator';

import { PostStatusType, PostType, SortDirection, SortField } from '@project/shared-core';

import { BlogPostDefaultValue } from './blog-post.constant';


export class BlogPostQuery {
  @Transform(({ value }) => +value || BlogPostDefaultValue.countLimit)
  @IsNumber()
  @IsOptional()
  public limit = BlogPostDefaultValue.countLimit;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = BlogPostDefaultValue.sortDirection;

  @Transform(({ value }) => +value || BlogPostDefaultValue.pageCount)
  @IsOptional()
  public page: number = BlogPostDefaultValue.pageCount;

  @Transform(({ value }) =>
    typeof value === 'string'
      ? value.split(',').filter((tag) => tag.trim() !== '')
      : value
  )
  @IsString({ each: true })
  @IsOptional()
  public tags?: string[];

  @IsIn(Object.values(SortField))
  @IsOptional()
  public sort?: SortField = BlogPostDefaultValue.sort;

  @IsIn(Object.values(PostType))
  @IsOptional()
  public type?: PostType;

  @IsString()
  @IsOptional()
  public search?: string;

  @IsIn(Object.values(PostStatusType))
  @IsOptional()
  public status?: PostStatusType;
}
