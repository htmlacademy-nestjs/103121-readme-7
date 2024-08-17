import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class CreateQuotePostDto {
  @ApiProperty({
    description: 'Quote text',
    example: 'Цитата известного человека'
  })
  @MinLength(20)
  @MaxLength(300)
  public quoteText: string;

  @ApiProperty({
    description: 'Quote author',
    example: 'Имя Фамилия'
  })
  @MinLength(3)
  @MaxLength(50)
  public quoteAuthor: string;
}
