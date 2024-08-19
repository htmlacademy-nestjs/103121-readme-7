import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UsePipes
} from '@nestjs/common';
import { fillDto } from '@project/shared-helpers';
import { BlogPostService } from './blog-post.service';
import { BlogPostRdo } from './rdo/blog-post.rdo';
import { BlogPostQuery } from './blog-post.query';
import { BlogPostWithPaginationRdo } from './rdo/blog-post-with-pagination.rdo';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BlogCommentResponseMessage, CommentRdo, CreateCommentDto, DeleteCommentDto } from '@project/blog-comment';
import { BlogLikeResponseMessage, LikeDto, LikeRdo } from '@project/blog-like';
import { PostValidationPipe } from './pipes/blog-post-validation.pipe';
import { CreateRepostDto } from './dto/create-repost.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogPostResponseMessage } from './blog-post.constant';

@ApiTags('posts')
@Controller('posts')
export class BlogPostController {
  constructor (
    private readonly blogPostService: BlogPostService,
  ) {}

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const post = await this.blogPostService.getPost(id);
    return fillDto(BlogPostRdo, post.toPOJO());
  }

  @Get('/')
  public async index(@Query() query: BlogPostQuery) {
    const postsWithPagination = await this.blogPostService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO()),
    }
    return fillDto(BlogPostWithPaginationRdo, result);
  }

  @UsePipes(PostValidationPipe)
  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const newPost = await this.blogPostService.createPost(dto);
    return fillDto(BlogPostRdo, newPost.toPOJO());
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string) {
    await this.blogPostService.deletePost(id);
  }

  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.blogPostService.updatePost(id, dto);
    return fillDto(BlogPostRdo, updatedPost.toPOJO());
  }

  @Post(`/:id/reposts`)
  public async createRepost(@Param('id') id: string, @Body() dto: CreateRepostDto) {
    const repost = await this.blogPostService.createRepost(id, dto);

    return fillDto(BlogPostRdo, repost.toPOJO());
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
  })
  @Post('/:postId/comments')
  public async createComment(@Param('postId') postId: string, @Body() dto: CreateCommentDto) {
    const newComment = await this.blogPostService.addComment(postId, dto);
    return fillDto(CommentRdo, newComment.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: BlogCommentResponseMessage.CommentIsNotYour,
  })
  @Delete('/:postId/comments')
  public async deleteComment(@Body() dto: DeleteCommentDto) {
    await this.blogPostService.deleteComment(dto);
  }

  @ApiResponse({
    type: LikeRdo,
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: BlogPostResponseMessage.LikeExists,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: BlogPostResponseMessage.PostIsNotPublished,
  })
  @Post('/:postId/likes')
  public async createLike(@Param('postId') postId: string, @Body() dto: LikeDto) {
    const newLike = await this.blogPostService.addLike(postId, dto);
    return fillDto(LikeRdo, newLike.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogLikeResponseMessage.LikeNotFound,
  })
  @Delete('/:postId/likes')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteLike(@Param('postId') postId: string, @Body() dto: LikeDto) {
    await this.blogPostService.deleteLike(postId, dto);
  }

  @Get(`/:userId/count`)
  public async count(@Param('userId') userId: string) {
    const count = await this.blogPostService.getCount(userId);

    return count;
  }
}
