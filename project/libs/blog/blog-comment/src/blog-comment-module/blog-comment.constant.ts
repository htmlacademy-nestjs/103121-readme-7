import { SortDirection } from '@project/shared-core';

export const BlogCommentValidateValue = {
  TextMinLength: 10,
  TextMaxLength: 300,
} as const;

export const DefautCommentValue = {
  countLimit: 50,
  sortDirection: SortDirection.Desc,
  pageCount: 1,
} as const;

export const BlogCommentResponseMessage = {
  CommentIsNotYour: 'You can delete only your comments',
} as const;


export const BlogCommentValidateMessage = {
  MessageIsEmpty: 'The message is empty',
  InvalidUserID: 'Invalid user id',
  InvalidID: 'Invalid id',
  TextMinLength: `The text must be at least ${BlogCommentValidateValue.TextMinLength} characters long`,
  TextMaxLength: `The text must be no more than ${BlogCommentValidateValue.TextMaxLength} characters long`,
} as const;
