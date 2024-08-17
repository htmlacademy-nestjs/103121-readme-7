import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class CreateTextPostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'Самый лучший пост на свете'
  })
  @MinLength(20)
  @MaxLength(50)
  public title: string;

  @ApiProperty({
    description: 'Post preview',
    example: 'Самый лучший пост на свете о том, как я сделал самый лучший пост на свете'
  })
  @MinLength(50)
  @MaxLength(255)
  public preview: string;

  @ApiProperty({
    description: 'Post text',
    example: 'Самый лучший пост на свете о том, как я сделал самый лучший пост на свете и вообще все было круто и я молодец'
  })
  @MinLength(100)
  @MaxLength(1024)
  public text: string;
}
