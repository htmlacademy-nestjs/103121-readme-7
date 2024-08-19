import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { PaginationResult } from '@project/shared-core';
import {
  BlogCommentRepository,
  CreateCommentDto,
  BlogCommentEntity,
  BlogCommentFactory,
  DeleteCommentDto,
  BlogCommentResponseMessage
} from '@project/blog-comment';

import { BlogPostRepository } from './blog-post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { BlogPostEntity } from './blog-post.entity';
import { BlogPostQuery } from './blog-post.query';
import { UpdatePostDto } from './dto/update-post.dto';
import { BlogPostFactory } from './blog-post.factory';
import { BlogLikeEntity, LikeDto, BlogLikeFactory, BlogLikeRepository } from '@project/blog-like';
import { CreateRepostDto } from './dto/create-repost.dto';
import { BlogPostResponseMessage } from './blog-post.constant';
import { PostStatusType } from '@prisma/client';

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

  public async deleteComment(dto: DeleteCommentDto): Promise<void> {
    const existsComment = await this.blogCommentRepository.findById(dto.id);

    if (existsComment.userId !== dto.userId) {
      throw new BadRequestException(BlogCommentResponseMessage.CommentIsNotYour);
    }

    await this.blogCommentRepository.deleteById(dto.id);
  }

  public async addLike(postId: string, dto: LikeDto): Promise<BlogLikeEntity> {
    const existsPost = await this.getPost(postId);

    if (existsPost.likes.some((like) => like.userId === dto.userId)) {
      throw new ConflictException(BlogPostResponseMessage.LikeExists);
    }

    if (existsPost.status !== PostStatusType.published) {
      throw new BadRequestException(BlogPostResponseMessage.PostIsNotPublished);
    }

    const newLike = this.blogLikeFactory.createFromDto(dto, existsPost.id);
    await this.blogLikeRepository.save(newLike);

    return newLike;
  }

  public async deleteLike(postId: string, dto: LikeDto): Promise<void> {
    const existsPost = await this.getPost(postId);
    await this.blogLikeRepository.delete(existsPost.id, dto.userId);
  }

  public async getCount(id: string) {
    return await this.blogPostRepository.getUserPostsCount(id);
  }

  public async createRepost(id: string, dto: CreateRepostDto) {
    const existsPost = await this.blogPostRepository.findById(id);

    await this.blogPostRepository.findExistedRepost(id, dto.userId);

    const repost = {
      ...existsPost,
      userId: dto.userId,
      isReposted: true,
      originalId: id,
      originalUserId: existsPost.userId,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    const newPost = BlogPostFactory.createFromCreatePostDto(repost);

    await this.blogPostRepository.save(newPost);

    return newPost;
  }
}
