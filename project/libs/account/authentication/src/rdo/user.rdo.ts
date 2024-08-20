import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '669b833d176cd8a2e1a66ffe'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User avatar id',
    example: '669b833d176cd8a2e1a66ffe'
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.local'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User login',
    example: 'Keks'
  })
  @Expose()
  public login: string;
}
