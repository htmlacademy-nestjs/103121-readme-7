import { SortDirection, SortField } from '@project/shared-core';

export const BlogPostDefaultValue = {
  countLimit: 25,
  countSearchLimit: 20,
  sortDirection: SortDirection.Desc,
  pageCount: 1,
  sort: SortField.CreatedAt,
} as const;

export const BlogPostResponseMessage = {
  LikeExists: 'Like already exists',
  PostIsNotPublished: 'Post is not published',
} as const;
