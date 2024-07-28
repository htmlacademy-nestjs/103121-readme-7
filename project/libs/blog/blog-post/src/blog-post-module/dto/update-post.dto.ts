import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsUrl,
  Matches,
  ArrayMaxSize,
} from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'Самый лучший пост на свете'
  })
  @MinLength(20)
  @MaxLength(50)
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: 'Video link',
    example: 'https://www.youtube.com/watch?v=video'
  })
  @IsOptional()
  public video?: string;

  @ApiProperty({
    description: 'Post preview',
    example: 'Самый лучший пост на свете о том, как я сделал самый лучший пост на свете'
  })
  @MinLength(50)
  @MaxLength(255)
  @IsOptional()
  public preview?: string;

  @ApiProperty({
    description: 'Post text',
    example: 'Самый лучший пост на свете о том, как я сделал самый лучший пост на свете и вообще все было круто и я молодец'
  })
  @MinLength(100)
  @MaxLength(1024)
  @IsOptional()
  public text?: string;

  @ApiProperty({
    description: 'Quote text',
    example: 'Цитата известного человека'
  })
  @MinLength(20)
  @MaxLength(300)
  @IsOptional()
  public quoteText?: string;

  @ApiProperty({
    description: 'Quote author',
    example: 'Имя Фамилия'
  })
  @MinLength(3)
  @MaxLength(50)
  @IsOptional()
  public quoteAuthor?: string;

  @ApiProperty({
    description: 'Photo',
    example: '/images/post.png'
  })
  @IsOptional()
  public photo?: string;

  @ApiProperty({
    description: 'Link',
    example: 'https://vl.ru'
  })
  @IsUrl()
  @IsOptional()
  public link?: string;

  @ApiProperty({
    description: 'Description',
    example: ''
  })
  @MaxLength(300)
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: 'Tags',
    example: ['tag1', 'tag2']
  })
  @IsString({ each: true })
  @MinLength(3, { each: true })
  @MaxLength(10, { each: true })
  @Matches(/^[A-Za-z][A-Za-z0-9]*$/, { each: true, message: 'Each tag must start with a letter and contain no spaces' })
  @ArrayMaxSize(8)
  @IsOptional()
  public tags?: string[];
}
