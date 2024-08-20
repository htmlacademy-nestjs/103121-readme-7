import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { BlogCommentResponseMessage, CommentRdo, CommentWithPaginationRdo, CreateCommentDto, DeleteCommentDto } from '@project/blog-comment';
import { AppResponseMessage } from '@project/shared-core';
import { ApplicationServiceURL } from './app.config';
import { BlogCommentQuery } from 'libs/blog/blog-comment/src/blog-comment-module/blog-comment.query';

@ApiTags('comments')
@Controller('comments')
@UseFilters(AxiosExceptionFilter)
export class CommentController {
  constructor(private readonly httpService: HttpService) {}

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AppResponseMessage.Unauthorized,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post(':postId')
  public async create(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto,
    @Req() req: Request
  ) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Blog}/${postId}/comments`,
      dto,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    return data;
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
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AppResponseMessage.Unauthorized,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(`:postId`)
  public async delete(
    @Param('postId') postId: string,
    @Body() dto: DeleteCommentDto,
    @Req() req: Request
  ) {
    await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Blog}/${postId}/comments`,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
        data: dto,
      }
    );
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @Get(':postId')
  public async index(
    @Param('postId') postId: string,
    @Query() query: BlogCommentQuery
  ) {
    const { data } =
      await this.httpService.axiosRef.get<CommentWithPaginationRdo>(
        `${ApplicationServiceURL.Blog}/${postId}/comments`,
        {
          params: query,
        }
      );

    return data;
  }
}
