import { IsMongoId, IsString } from 'class-validator';

export class CreateRepostDto {
  @IsMongoId()
  public userId: string;
}
