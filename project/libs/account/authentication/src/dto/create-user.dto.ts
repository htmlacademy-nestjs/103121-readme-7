import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import {
  AuthenticationValidateMessage,
  NAME_MAX_LENGTH, NAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH
} from '../authentication-module/authentication.constant';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'User login',
    example: 'Keks',
  })
  @IsString({ message: AuthenticationValidateMessage.NameIsNotString })
  @MinLength(NAME_MIN_LENGTH, { message: AuthenticationValidateMessage.NameMinLength })
  @MaxLength(NAME_MAX_LENGTH, { message: AuthenticationValidateMessage.NameMaxLength })
  public login: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString({ message: AuthenticationValidateMessage.PasswordIsNotString })
  @MinLength(PASSWORD_MIN_LENGTH, { message: AuthenticationValidateMessage.PasswordMinLength })
  @MaxLength(PASSWORD_MAX_LENGTH, { message: AuthenticationValidateMessage.PasswordMaxLength })
  public password: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png'
  })
  @IsString()
  @IsOptional()
  public avatar?: string;
}
