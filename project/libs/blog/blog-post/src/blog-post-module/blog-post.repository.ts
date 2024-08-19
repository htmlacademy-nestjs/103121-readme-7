import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PaginationResult, Post, PostStatusType, SortField } from '@project/shared-core';
import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/blog-models';
import { PostType } from '@project/shared-core';

import { BlogPostEntity } from './blog-post.entity';
import { BlogPostFactory } from './blog-post.factory';
import { BlogPostQuery } from './blog-post.query';

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<BlogPostEntity, Post> {
  constructor(
    entityFactory: BlogPostFactory,
    readonly client: PrismaClientService,
  ) {
    super(entityFactory, client)
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async save(entity: BlogPostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    const { id, tags, ...clearedData } = pojoEntity;
    const uniqueTags = Array.from(new Set(tags.map(tag => tag.toLowerCase())));
    console.log(uniqueTags);
    const record = await this.client.post.create({
      data: {
        ...clearedData,
        tags: uniqueTags,
        comments: {
          connect: [],
        },
        likes: {
          connect: [],
        },
      }
    });

    entity.id = record.id;
    entity.tags = record.tags;
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id
      }
    });
  }

  public async findById(id: string): Promise<BlogPostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        comments: true,
        likes: true,
      }
    });

    if (!document) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    return this.createEntityFromDocument({
      ...document,
      type: document.type as PostType,
      status: document.status as PostStatusType,
    });
  }

  public async update(entity: BlogPostEntity): Promise<BlogPostEntity> {
    const pojoEntity = entity.toPOJO();
    await this.client.post.update({
      where: { id: entity.id },
      data: {
        title: pojoEntity.title,
        video: pojoEntity.video,
        preview: pojoEntity.preview,
        text: pojoEntity.text,
        quoteText: pojoEntity.quoteText,
        quoteAuthor: pojoEntity.quoteAuthor,
        photo: pojoEntity.photo,
        link: pojoEntity.link,
        description: pojoEntity.description,
        tags: pojoEntity.tags,
        type: pojoEntity.type,
        status: pojoEntity.status,
        isReposted: pojoEntity.isReposted,
        originalId: pojoEntity.originalId,
        originalUserId: pojoEntity.originalUserId,
      },
      include: {
        likes: true,
        comments: true,
      }
    });

    return undefined;
  }

  public async find(query?: BlogPostQuery): Promise<PaginationResult<BlogPostEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    if (query?.tags) {
      where.tags = {
        hasSome: query.tags,
      };
    }

    if (query?.type) {
      where.type = query.type;
    }

    switch (query?.sort) {
      case SortField.LikesCount:
        orderBy.likes = {
          _count: query.sortDirection,
        };
        break;
      case SortField.CommentsCount:
        orderBy.comments = {
          _count: query.sortDirection,
        };
        break;
      default:
        orderBy.createdAt = query.sortDirection;
        break;
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({ where, orderBy, skip, take,
        include: {
          likes: true,
          comments: true,
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument({
        ...record,
        type: record.type as PostType,
        status: record.status as PostStatusType,
      })),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    }
  }

  public async getUserPostsCount(userId: string) {
    return this.getPostCount({
      userId,
    });
  }

  public async findExistedRepost(originalId: string, userId: string) {
    const document = await this.client.post.findFirst({
      where: {
        originalId,
        userId,
        isReposted: true,
      },
    });

    if (document) {
      throw new ConflictException('Post already reposted');
    }

    return document;
  }
}
