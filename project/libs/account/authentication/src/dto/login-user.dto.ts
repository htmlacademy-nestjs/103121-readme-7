import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import {
  AuthenticationValidateMessage,
  AuthenticationValidateValue
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
  @MinLength(AuthenticationValidateValue.NameMinLength, { message: AuthenticationValidateMessage.PasswordMinLength })
  @MaxLength(AuthenticationValidateValue.NameMaxLength, { message: AuthenticationValidateMessage.PasswordMaxLength })
  public password: string;
}
