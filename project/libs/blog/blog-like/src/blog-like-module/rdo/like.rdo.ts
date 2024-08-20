import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LikeRdo {
  @ApiProperty({
    description: 'Post id',
    example: '6d308040-96a2-4162-bea6-2338e9976540'
  })
  @Expose()
  @Expose()
  public postId: string;

  @ApiProperty({
    description: 'User id',
    example: '5f4f4f4f4f4f4f4f4f4f4f4f'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Created at',
    example: '2021-01-01T00:00:00.000Z'
  })
  @Expose()
  public createdAt: Date;
}
