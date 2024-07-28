import { Expose } from 'class-transformer';
import { PostType, Comment, Like } from '@project/shared-core';

export class BlogPostRdo {
  @Expose()
  public id: string;

  @Expose()
  public type: PostType;

  @Expose()
  public createdAt: string;

  @Expose()
  public userId: string;

  @Expose()
  public comments: Comment[]

  @Expose()
  public likes: Like[]
}
