import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogConfigModule } from '@project/blog-config';
import { BlogCommentModule } from '@project/blog-comment';
import { BlogLikeModule } from '@project/blog-like';
import { BlogPostModule } from '@project/blog-post';
import { NotifyBlogModule } from '@project/blog-notify';

@Module({
  imports: [BlogCommentModule, BlogPostModule, BlogLikeModule, BlogConfigModule, NotifyBlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
