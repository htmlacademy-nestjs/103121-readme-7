import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogCommentModule } from '@project/blog-comment';
import { BlogLikeModule } from '@project/blog-like';
import { BlogPostModule } from '@project/blog-post';

@Module({
  imports: [BlogCommentModule, BlogPostModule, BlogLikeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
