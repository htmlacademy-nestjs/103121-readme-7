import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import {
  AuthenticationValidateMessage,
  AuthenticationValidateValue,
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
  @MinLength(AuthenticationValidateValue.NameMinLength, { message: AuthenticationValidateMessage.NameMinLength })
  @MaxLength(AuthenticationValidateValue.NameMaxLength, { message: AuthenticationValidateMessage.NameMaxLength })
  public login: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString({ message: AuthenticationValidateMessage.PasswordIsNotString })
  @MinLength(AuthenticationValidateValue.PasswordMinLength, { message: AuthenticationValidateMessage.PasswordMinLength })
  @MaxLength(AuthenticationValidateValue.NameMaxLength, { message: AuthenticationValidateMessage.PasswordMaxLength })
  public password: string;

  @ApiProperty({
    description: 'User avatar id',
    example: '669b833d176cd8a2e1a66ffe'
  })
  @IsString()
  @IsOptional()
  public avatar?: string;
}
