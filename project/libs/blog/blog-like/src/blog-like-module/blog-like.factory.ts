import { Injectable } from '@nestjs/common';
import { LikeDto } from './dto/like.dto';

import { Like, EntityFactory } from '@project/shared-core';
import { BlogLikeEntity } from './blog-like.entity';

@Injectable()
export class BlogLikeFactory implements EntityFactory<BlogLikeEntity> {
  public create(entityPlainData: Like): BlogLikeEntity {
    return new BlogLikeEntity(entityPlainData);
  }

  public createFromDto(dto: LikeDto, postId: string): BlogLikeEntity {
    const currentDate = new Date();
    return new BlogLikeEntity({
      ...dto,
      postId,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
  }
}
