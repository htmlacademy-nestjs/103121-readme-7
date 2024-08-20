import { IsMongoId, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BlogCommentValidateMessage, TEXT_MAX_LENGTH, TEXT_MIN_LENGTH } from '../blog-comment.constant';

export class CreateCommentDto {
  @IsString()
  @MinLength(TEXT_MIN_LENGTH, { message: BlogCommentValidateMessage.TextMinLength })
  @MaxLength(TEXT_MAX_LENGTH, { message: BlogCommentValidateMessage.TextMaxLength })
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
