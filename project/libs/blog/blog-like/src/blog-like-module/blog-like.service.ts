import { Injectable } from '@nestjs/common';

import { BlogLikeRepository } from './blog-like.repository';
import { BlogLikeEntity } from './blog-like.entity';

@Injectable()
export class BlogLikeService {
  constructor(
    private readonly blogLikeRepository: BlogLikeRepository
  ) {}

  public async getLikes(postId: string): Promise<BlogLikeEntity[]> {
    return this.blogLikeRepository.findByPostId(postId);
  }
}
