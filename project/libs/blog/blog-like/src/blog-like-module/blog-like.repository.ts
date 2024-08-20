import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClientService } from '@project/blog-models';
import { Like } from '@project/shared-core';

import { BlogLikeEntity } from './blog-like.entity';
import { BlogLikeFactory } from './blog-like.factory';
import { BasePostgresRepository } from '@project/data-access';
import { BlogLikeResponseMessage } from './blog-like.constant';

@Injectable()
export class BlogLikeRepository extends BasePostgresRepository<BlogLikeEntity, Like> {
  constructor(
    entityFactory: BlogLikeFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async save(entity: BlogLikeEntity): Promise<void> {
    const record = await this.client.like.create({
      data: { ...entity.toPOJO() }
    });

    entity.id = record.id;
  }

  public async delete(postId: string, userId: string): Promise<void> {
    const existsLike = await this.client.like.findFirst({
      where: {
          userId,
          postId,
      },
    });

    if (existsLike) {
      await this.client.like.delete({
        where: {
          id: existsLike.id,
        }
      });
    } else {
      throw new NotFoundException(BlogLikeResponseMessage.LikeNotFound);
    }
  }

  public async findById(id: string): Promise<BlogLikeEntity> {
    const document = await this.client.like.findFirst({
      where: {
        id,
      },
    });

    if (!document) {
      throw new NotFoundException(BlogLikeResponseMessage.LikeNotFound);
    }

    return this.createEntityFromDocument(document);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.like.delete({
      where: {
        id,
      }
    });
  }

  public async findByPostId(postId: string): Promise<BlogLikeEntity[]> {
    const records = await this.client.like.findMany({
      where: {
        postId
      }
    });

    return records.map(record => this.createEntityFromDocument(record))
  }
}
