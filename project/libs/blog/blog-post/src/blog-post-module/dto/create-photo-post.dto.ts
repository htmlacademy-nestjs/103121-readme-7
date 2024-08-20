import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class CreatePhotoPostDto {
  @ApiProperty({
    description: 'Photo',
    example: '/images/post.png'
  })
  @IsMongoId()
  public photo: string;
}
