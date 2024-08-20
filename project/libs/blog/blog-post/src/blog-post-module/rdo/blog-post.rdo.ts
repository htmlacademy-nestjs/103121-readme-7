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

  @Expose()
  public title?: string;

  @Expose()
  public video?: string;

  @Expose()
  public preview?: string;

  @Expose()
  public text?: string;

  @Expose()
  public quoteText?: string;

  @Expose()
  public quoteAuthor?: string;

  @Expose()
  public photo?: string;

  @Expose()
  public link?: string;

  @Expose()
  public description?: string;

  @Expose()
  public tags?: string[];

  @Expose()
  public isReposted?: boolean;

  @Expose()
  public originalId?: string;

  @Expose()
  public originalUserId?: string;
}
