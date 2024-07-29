import { IsMongoId, IsString, IsUUID } from 'class-validator';

export class CreateLikeDto {
  @IsString()
  @IsMongoId()
  public userId: string;

  @IsString()
  @IsUUID()
  public postId: string;
}
