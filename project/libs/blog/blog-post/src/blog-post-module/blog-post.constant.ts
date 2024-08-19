import { SortDirection } from '@project/shared-core';

export const DEFAULT_POST_COUNT_LIMIT = 10;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_PAGE_COUNT = 1;

export const BlogPostResponseMessage = {
  LikeExists: 'Like already exists',
  PostIsNotPublished: 'Post is not published',
} as const;
