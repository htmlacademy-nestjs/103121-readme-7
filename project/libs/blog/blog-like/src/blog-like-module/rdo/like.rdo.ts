import { Expose } from 'class-transformer';

export class LikeRdo {
  @Expose()
  public postId: string;

  @Expose()
  public userId: string;

  @Expose()
  public createdAt: Date;
}
