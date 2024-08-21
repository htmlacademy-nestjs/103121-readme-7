import { IsEmail, IsNotEmpty } from 'class-validator';

import { EmailValidationMessage } from '../email-subscriber.constant';

export class CreateSubscriberDto {
  @IsEmail({}, { message: EmailValidationMessage.emailNotValid })
  public email: string;

  @IsNotEmpty({ message: EmailValidationMessage.loginIsEmpty })
  public login: string;
}
