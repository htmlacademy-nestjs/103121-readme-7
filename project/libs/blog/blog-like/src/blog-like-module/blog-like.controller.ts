import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { BlogLikeService } from './blog-like.service';
import { fillDto } from '@project/shared-helpers';
import { CreateLikeDto } from './dto/create-like.dto';
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

  @Post('/')
  public async create(@Param('postId') postId: string, @Body() dto: CreateLikeDto) {
    const newLike = await this.blogLikeService.createLike(postId, dto);
    return fillDto(LikeRdo, newLike.toPOJO());
  }

}
