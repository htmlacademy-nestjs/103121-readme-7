export const AUTH_USER_EXISTS = 'User with this email exists';
export const AUTH_USER_NOT_FOUND = 'User not found';
export const AUTH_USER_PASSWORD_WRONG = 'User password is wrong';

export const NAME_MIN_LENGTH = 3;
export const NAME_MAX_LENGTH = 50;
export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 12;

export const AuthenticationResponseMessage = {
  LoggedSuccess: 'User has been successfully logged',
  LoggedError: 'Password or Login is wrong',
  UserFound: 'User found',
  UserNotFound: 'User not found',
  UserExist: 'User with the email already exists',
  UserCreated: 'The new user has been successfully created',
} as const;

export const AuthenticationValidateMessage = {
  EmailNotValid: 'The email is not valid',
  NameIsNotString: 'The name must be a string',
  NameMinLength: `The name must be at least ${NAME_MIN_LENGTH} characters long`,
  NameMaxLength: `The name must be no more than ${NAME_MAX_LENGTH} characters long`,
  PasswordIsNotString: 'The password must be a string',
  PasswordMinLength: `The password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
  PasswordMaxLength: `The password must be no more than ${PASSWORD_MAX_LENGTH} characters long`,
} as const;
