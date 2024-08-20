import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/blog-models';

import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostFactory } from './blog-post.factory';
import { BlogCommentModule } from '@project/blog-comment';
import { BlogLikeModule } from '@project/blog-like';
import { NotifyBlogModule } from '@project/blog-notify';

@Module({
  imports: [PrismaClientModule, BlogCommentModule, BlogLikeModule, NotifyBlogModule],
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostRepository, BlogPostFactory],
  exports: [BlogPostService],
})
export class BlogPostModule {}
