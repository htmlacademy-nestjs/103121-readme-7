import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import {
  AuthenticationValidateMessage,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH
} from '../authentication-module/authentication.constant';
export class LoginUserDto {
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString({ message: AuthenticationValidateMessage.PasswordIsNotString })
  @MinLength(PASSWORD_MIN_LENGTH, { message: AuthenticationValidateMessage.PasswordMinLength })
  @MaxLength(PASSWORD_MAX_LENGTH, { message: AuthenticationValidateMessage.PasswordMaxLength })
  public password: string;
}
