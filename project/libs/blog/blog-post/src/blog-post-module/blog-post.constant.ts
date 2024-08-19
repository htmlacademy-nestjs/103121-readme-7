import { SortDirection, SortField } from '@project/shared-core';

export const DEFAULT_POST_COUNT_LIMIT = 25;
export const DEFAULT_POST_COUNT_SEARCH_LIMIT = 20;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_PAGE_COUNT = 1;
export const DEFAULT_SORT = SortField.CreatedAt;

export const BlogPostResponseMessage = {
  LikeExists: 'Like already exists',
  PostIsNotPublished: 'Post is not published',
} as const;
