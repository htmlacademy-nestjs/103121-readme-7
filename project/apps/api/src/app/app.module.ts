import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpClientSettings } from './app.config';
import { UsersController } from './users.controller';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { BlogController } from './blog.controller';
import { LikeController } from './like.controller';
import { CommentController } from './comment.controller';
import { NotificationController } from './notification.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: HttpClientSettings.Timeout,
      maxRedirects: HttpClientSettings.MaxRedirects,
    }),
  ],
  controllers: [
    UsersController,
    BlogController,
    LikeController,
    CommentController,
    NotificationController
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {}
