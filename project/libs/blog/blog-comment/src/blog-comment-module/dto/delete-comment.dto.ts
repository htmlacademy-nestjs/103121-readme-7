import { IsMongoId, IsString } from 'class-validator';
import { BlogCommentValidateMessage } from '../blog-comment.constant';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteCommentDto {
  @IsString()
  public id: string;

  @ApiProperty({
    description: 'User id',
    example: '5f4f4f4f4f4f4f4f4f4f4f4f'
  })
  @IsString()
  @IsMongoId({ message: BlogCommentValidateMessage.InvalidUserID })
  public userId: string;
}
