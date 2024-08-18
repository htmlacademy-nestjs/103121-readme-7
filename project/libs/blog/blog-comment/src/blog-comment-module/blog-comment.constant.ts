export const MAX_COMMENTS_COUNT = 50;
export const TEXT_MIN_LENGTH = 10;
export const TEXT_MAX_LENGTH = 300;

export const BlogCommentValidateMessage = {
  MessageIsEmpty: 'The message is empty',
  InvalidUserID: 'Invalid user id',
  InvalidID: 'Invalid id',
  TextMinLength: `The text must be at least ${TEXT_MIN_LENGTH} characters long`,
  TextMaxLength: `The text must be no more than ${TEXT_MAX_LENGTH} characters long`,
} as const;
