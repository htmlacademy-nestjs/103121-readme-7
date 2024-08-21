export const AuthenticationExceptionMessage = {
  UserExists: 'User with this email exists',
  UserNotFound: 'User not found',
  UserPasswordWrong: 'User password is wrong',
} as const;

export const AuthenticationValidateValue = {
  NameMinLength: 3,
  NameMaxLength: 50,
  PasswordMinLength: 6,
  PasswordMaxLength: 12,
} as const;

export const AuthenticationResponseMessage = {
  LoggedSuccess: 'User has been successfully logged',
  LoggedError: 'Password or Login is wrong',
  UserFound: 'User found',
  UserNotFound: 'User not found',
  UserExist: 'User with the email already exists',
  UserCreated: 'The new user has been successfully created',
  PasswordChanged: 'The password has been successfully changed',
} as const;

export const AuthenticationValidateMessage = {
  EmailNotValid: 'The email is not valid',
  NameIsNotString: 'The name must be a string',
  NameMinLength: `The name must be at least ${AuthenticationValidateValue.NameMinLength} characters long`,
  NameMaxLength: `The name must be no more than ${AuthenticationValidateValue.NameMaxLength} characters long`,
  PasswordIsNotString: 'The password must be a string',
  PasswordMinLength: `The password must be at least ${AuthenticationValidateValue.PasswordMinLength} characters long`,
  PasswordMaxLength: `The password must be no more than ${AuthenticationValidateValue.PasswordMaxLength} characters long`,
} as const;
