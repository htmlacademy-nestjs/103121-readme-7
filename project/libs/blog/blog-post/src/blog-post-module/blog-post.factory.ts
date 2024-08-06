import { Injectable } from '@nestjs/common';

import { EntityFactory, Post } from '@project/shared-core';

import { BlogPostEntity } from './blog-post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
  public create(entityPlainData: Post): BlogPostEntity {
    return new BlogPostEntity(entityPlainData);
  }

  public static createFromCreatePostDto(dto: CreatePostDto): BlogPostEntity {
    const entity = new BlogPostEntity();
    entity.title = dto.title;
    entity.description = dto.description;
    entity.userId = dto.userId;
    entity.comments = [];

    return entity;
  }
}
