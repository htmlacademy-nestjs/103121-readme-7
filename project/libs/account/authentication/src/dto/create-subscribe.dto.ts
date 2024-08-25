import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString, } from 'class-validator';

export class CreateSubscribeDto {
  @ApiProperty({
    description: 'User id',
    example: '669b833d176cd8a2e1a66ffe'
  })
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  public userId: string;

  @ApiProperty({
    description: 'Author id',
    example: '669b833d176cd8a2e1a66ffe'
  })
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  public authorId: string;
}
