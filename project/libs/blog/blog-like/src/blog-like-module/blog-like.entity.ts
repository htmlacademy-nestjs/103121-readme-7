import { Like, Entity, StorableEntity } from '@project/shared-core';

export class BlogLikeEntity extends Entity implements StorableEntity<Like> {
  public createdAt: Date;
  public updatedAt: Date;
  public postId?: string;
  public userId: string;

  constructor(like?: Like) {
    super();
    this.populate(like);
  }

  public populate(like?: Like): void {
    if (!like) {
      return;
    }

    this.id = like.id ?? undefined;
    this.createdAt = like.createdAt;
    this.updatedAt = like.updatedAt;
    this.postId = like.postId ?? undefined;
    this.userId = like.userId;
  }

  public toPOJO(): Like {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      postId: this.postId,
      userId: this.userId,
    }
  }
}
