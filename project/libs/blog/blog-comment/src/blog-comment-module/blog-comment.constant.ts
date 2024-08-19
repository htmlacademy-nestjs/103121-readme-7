import { SortDirection } from '@project/shared-core';

export const MAX_COMMENTS_COUNT = 50;
export const TEXT_MIN_LENGTH = 10;
export const TEXT_MAX_LENGTH = 300;

export const DEFAULT_COMMENT_COUNT_LIMIT = 50;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_PAGE_COUNT = 1;

export const BlogCommentResponseMessage = {
  CommentIsNotYour: 'You can delete only your comments',
} as const;


export const BlogCommentValidateMessage = {
  MessageIsEmpty: 'The message is empty',
  InvalidUserID: 'Invalid user id',
  InvalidID: 'Invalid id',
  TextMinLength: `The text must be at least ${TEXT_MIN_LENGTH} characters long`,
  TextMaxLength: `The text must be no more than ${TEXT_MAX_LENGTH} characters long`,
} as const;
