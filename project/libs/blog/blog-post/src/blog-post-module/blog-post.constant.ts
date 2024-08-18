import { SortDirection } from '@project/shared-core';

export const DEFAULT_POST_COUNT_LIMIT = 10;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_PAGE_COUNT = 1;

export const BlogPostResponseMessage = {
  LikeNotFound: 'Like not found',
  UserNotLoggedIn: 'User is not logged in',
  LikeExists: 'Like already exists',
  PostIsNotPublished: 'Post is not published',
} as const;

export const BlogPostValidateMessage = {
  EmailNotValid: 'The email is not valid',
  NameIsNotString: 'The name must be a string',
  NameMinLength: `The name must be at least characters long`,
  NameMaxLength: `The name must be no more than characters long`,
  PasswordIsNotString: 'The password must be a string',
} as const;
