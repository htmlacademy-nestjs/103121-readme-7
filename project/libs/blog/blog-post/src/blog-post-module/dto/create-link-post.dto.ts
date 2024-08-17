import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUrl, MaxLength } from 'class-validator';

export class CreateLinkPostDto {
  @ApiProperty({
    description: 'Link',
    example: 'https://vl.ru'
  })
  @IsUrl()
  public link: string;

  @ApiProperty({
    description: 'Description',
    example: ''
  })
  @MaxLength(300)
  @IsOptional()
  public description?: string;
}
