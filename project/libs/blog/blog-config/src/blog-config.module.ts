import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import applicationConfig from './app.config';
import rabbitBlogConfig from './rabbit.config';

const ENV_BLOG_FILE_PATH = 'apps/blog/blog.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, rabbitBlogConfig],
      envFilePath: ENV_BLOG_FILE_PATH,
    }),
  ],
})
export class BlogConfigModule {}
