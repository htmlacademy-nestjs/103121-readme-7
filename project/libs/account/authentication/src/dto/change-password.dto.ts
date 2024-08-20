import { IsString, MinLength, MaxLength, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '../authentication-module/authentication.constant';
import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString({ message: AuthenticationValidateMessage.PasswordIsNotString })
  @MinLength(PASSWORD_MIN_LENGTH, { message: AuthenticationValidateMessage.PasswordMinLength })
  @MaxLength(PASSWORD_MAX_LENGTH, { message: AuthenticationValidateMessage.PasswordMaxLength })
  public password: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString({ message: AuthenticationValidateMessage.PasswordIsNotString })
  @MinLength(PASSWORD_MIN_LENGTH, { message: AuthenticationValidateMessage.PasswordMinLength })
  @MaxLength(PASSWORD_MAX_LENGTH, { message: AuthenticationValidateMessage.PasswordMaxLength })
  public newPassword: string;

  @IsString()
  @IsMongoId()
  public userId: string;
}
