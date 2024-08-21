import { IsMongoId, IsString } from 'class-validator';

export class CreateLikeDto {
  @IsString()
  @IsMongoId()
  public userId: string;
}
