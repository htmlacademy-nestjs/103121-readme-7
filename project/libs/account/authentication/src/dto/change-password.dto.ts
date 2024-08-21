import { IsString, MinLength, MaxLength, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AuthenticationValidateValue } from '../authentication-module/authentication.constant';
import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString({ message: AuthenticationValidateMessage.PasswordIsNotString })
  @MinLength(AuthenticationValidateValue.PasswordMinLength, { message: AuthenticationValidateMessage.PasswordMinLength })
  @MaxLength(AuthenticationValidateValue.PasswordMaxLength, { message: AuthenticationValidateMessage.PasswordMaxLength })
  public password: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString({ message: AuthenticationValidateMessage.PasswordIsNotString })
  @MinLength(AuthenticationValidateValue.PasswordMinLength, { message: AuthenticationValidateMessage.PasswordMinLength })
  @MaxLength(AuthenticationValidateValue.PasswordMaxLength, { message: AuthenticationValidateMessage.PasswordMaxLength })
  public newPassword: string;

  @IsString()
  @IsMongoId()
  public userId: string;
}
