import { Injectable } from '@nestjs/common';

import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentEntity } from './blog-comment.entity';
import { BlogCommentQuery } from './blog-comment.query';
import { PaginationResult } from '@project/shared-core';

@Injectable()
export class BlogCommentService {
  constructor(
    private readonly blogCommentRepository: BlogCommentRepository
  ) {}

  public async getComments(postId: string, query?: BlogCommentQuery): Promise<PaginationResult<BlogCommentEntity>>  {
    return this.blogCommentRepository.findByPostId(postId, query);
  }
}
