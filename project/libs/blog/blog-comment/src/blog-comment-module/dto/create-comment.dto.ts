import { IsMongoId, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { BlogCommentValidateMessage, TEXT_MAX_LENGTH, TEXT_MIN_LENGTH } from '../blog-comment.constant';

export class CreateCommentDto {
  @IsString()
  @MinLength(TEXT_MIN_LENGTH, { message: BlogCommentValidateMessage.TextMinLength })
  @MaxLength(TEXT_MAX_LENGTH, { message: BlogCommentValidateMessage.TextMaxLength })
  @IsNotEmpty({ message: BlogCommentValidateMessage.MessageIsEmpty })
  public message: string;

  @IsString()
  @IsMongoId({ message: BlogCommentValidateMessage.InvalidID })
  public userId: string;
}
