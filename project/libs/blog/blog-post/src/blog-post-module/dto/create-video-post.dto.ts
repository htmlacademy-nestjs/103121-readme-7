import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength, IsUrl } from 'class-validator';

export class CreateVideoPostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'Самый лучший пост на свете'
  })
  @MinLength(20)
  @MaxLength(50)
  public title: string;

  @ApiProperty({
    description: 'Video link',
    example: 'https://www.youtube.com/watch?v=video'
  })
  @IsUrl()
  public video: string;
}
