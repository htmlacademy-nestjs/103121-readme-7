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
    entity.video = dto.video;
    entity.preview = dto.preview;
    entity.link = dto.link;
    entity.photo = dto.photo;
    entity.quoteAuthor = dto.quoteAuthor;
    entity.quoteText = dto.quoteText;
    entity.tags = dto.tags;
    entity.text = dto.text;
    entity.type = dto.type;
    entity.title = dto.title;
    entity.description = dto.description;
    entity.userId = dto.userId;
    entity.comments = [];
    entity.likes = [];

    return entity;
  }
}
