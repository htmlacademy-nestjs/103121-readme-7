import { Controller, Get, Param, Query } from '@nestjs/common';

import { BlogCommentService } from './blog-comment.service';
import { fillDto } from '@project/shared-helpers';
import { BlogCommentQuery } from './blog-comment.query';
import { CommentWithPaginationRdo } from './rdo/comment-with-pagination.rdo';

@Controller('posts/:postId/comments')
export class BlogCommentController {
  constructor(
    private readonly blogCommentService: BlogCommentService,
  ) {}

  @Get('/')
  public async show(@Param('postId') postId: string, @Query() query: BlogCommentQuery) {
    const commentsWithPagination = await this.blogCommentService.getComments(
      postId,
      query
    );

    const result = {
      ...commentsWithPagination,
      entities: commentsWithPagination.entities.map((comment) =>
        comment.toPOJO()
      ),
    };
    return fillDto(CommentWithPaginationRdo, result);
  }
}
