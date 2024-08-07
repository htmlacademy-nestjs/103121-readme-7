import { Controller, Get, Param } from '@nestjs/common';

import { BlogLikeService } from './blog-like.service';
import { fillDto } from '@project/shared-helpers';
import { LikeRdo } from './rdo/like.rdo';

@Controller('posts/:postId/likes')
export class BlogLikeController {
  constructor(
    private readonly blogLikeService: BlogLikeService,
  ) {}

  @Get('/')
  public async show(@Param('postId') postId: string) {
    const likes = await this.blogLikeService.getLikes(postId);
    return fillDto(LikeRdo, likes.map((like) => like.toPOJO()));
  }
}
