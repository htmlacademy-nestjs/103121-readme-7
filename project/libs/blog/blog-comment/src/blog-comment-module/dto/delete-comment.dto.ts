import { IsMongoId, IsString } from 'class-validator';
import { BlogCommentValidateMessage } from '../blog-comment.constant';

export class DeleteCommentDto {
  @IsString()
  public id: string;

  @IsString()
  @IsMongoId({ message: BlogCommentValidateMessage.InvalidUserID })
  public userId: string;
}
