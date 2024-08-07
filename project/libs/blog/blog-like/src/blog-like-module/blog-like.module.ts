import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/blog-models';

import { BlogLikeController } from './blog-like.controller';
import { BlogLikeService } from './blog-like.service';
import { BlogLikeRepository } from './blog-like.repository';
import { BlogLikeFactory } from './blog-like.factory';

@Module({
  imports: [PrismaClientModule],
  controllers: [BlogLikeController],
  providers: [BlogLikeService, BlogLikeRepository, BlogLikeFactory],
  exports: [BlogLikeRepository, BlogLikeFactory]
})
export class BlogLikeModule {}
