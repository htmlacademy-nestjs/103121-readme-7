import { IsMongoId, IsString } from 'class-validator';

export class LikeDto {
  @IsString()
  @IsMongoId()
  public userId: string;
}
