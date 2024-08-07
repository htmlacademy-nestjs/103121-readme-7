import { Injectable, NotFoundException } from '@nestjs/common';

import { PaginationResult } from '@project/shared-core';
import {
  BlogCommentRepository,
  CreateCommentDto,
  BlogCommentEntity,
  BlogCommentFactory
} from '@project/blog-comment';

import { BlogPostRepository } from './blog-post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { BlogPostEntity } from './blog-post.entity';
import { BlogPostQuery } from './blog-post.query';
import { UpdatePostDto } from './dto/update-post.dto';
import { BlogPostFactory } from './blog-post.factory';
import { BlogLikeEntity, CreateLikeDto, BlogLikeFactory, BlogLikeRepository } from '@project/blog-like';

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    private readonly blogCommentRepository: BlogCommentRepository,
    private readonly blogCommentFactory: BlogCommentFactory,
    private readonly blogLikeRepository: BlogLikeRepository,
    private readonly blogLikeFactory: BlogLikeFactory,
  ) {}

  public async getAllPosts(query?: BlogPostQuery): Promise<PaginationResult<BlogPostEntity>> {
    return this.blogPostRepository.find(query);
  }

  public async createPost(dto: CreatePostDto): Promise<BlogPostEntity> {
    const newPost = BlogPostFactory.createFromCreatePostDto(dto);
    await this.blogPostRepository.save(newPost);

    return newPost;
  }

  public async deletePost(id: string): Promise<void> {
    try {
      await this.blogPostRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }

  public async getPost(id: string): Promise<BlogPostEntity> {
    return this.blogPostRepository.findById(id);
  }

  public async updatePost(id: string, dto: UpdatePostDto): Promise<BlogPostEntity> {
    const existsPost = await this.blogPostRepository.findById(id);

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && existsPost[key] !== value) {
        existsPost[key] = value;
      }
    }

    await this.blogPostRepository.update(existsPost);

    return existsPost;
  }

  public async addComment(postId: string, dto: CreateCommentDto): Promise<BlogCommentEntity> {
    const existsPost = await this.getPost(postId);
    const newComment = this.blogCommentFactory.createFromDto(dto, existsPost.id);
    await this.blogCommentRepository.save(newComment);

    return newComment;
  }

  public async addLike(postId: string, dto: CreateLikeDto): Promise<BlogLikeEntity> {
    const existsPost = await this.getPost(postId);
    const newLike = this.blogLikeFactory.createFromDto(dto, existsPost.id);
    await this.blogLikeRepository.save(newLike);

    return newLike;
  }
}
