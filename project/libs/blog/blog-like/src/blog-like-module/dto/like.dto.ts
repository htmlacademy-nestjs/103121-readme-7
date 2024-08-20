import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class LikeDto {
  @ApiProperty({
    description: 'User id',
    example: '5f4f4f4f4f4f4f4f4f4f4f4f'
  })
  @IsString()
  @IsMongoId()
  public userId: string;
}
