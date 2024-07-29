import { Injectable, NotImplementedException } from '@nestjs/common';

import { BlogLikeRepository } from './blog-like.repository';
import { BlogLikeEntity } from './blog-like.entity';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class BlogLikeService {
  constructor(
    private readonly blogLikeRepository: BlogLikeRepository
  ) {}

  public async getLikes(postId: string): Promise<BlogLikeEntity[]> {
    return this.blogLikeRepository.findByPostId(postId);
  }

  public async createLike(postId: string, dto: CreateLikeDto): Promise<BlogLikeEntity> {
    throw new NotImplementedException();
  }
}
