import { IsMongoId, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BlogCommentValidateMessage, BlogCommentValidateValue } from '../blog-comment.constant';

export class CreateCommentDto {
  @IsString()
  @MinLength(BlogCommentValidateValue.TextMinLength, { message: BlogCommentValidateMessage.TextMinLength })
  @MaxLength(BlogCommentValidateValue.TextMaxLength, { message: BlogCommentValidateMessage.TextMaxLength })
  @IsNotEmpty({ message: BlogCommentValidateMessage.MessageIsEmpty })
  public message: string;

  @ApiProperty({
    description: 'User id',
    example: '5f4f4f4f4f4f4f4f4f4f4f4f'
  })
  @IsString()
  @IsMongoId({ message: BlogCommentValidateMessage.InvalidID })
  public userId: string;
}
