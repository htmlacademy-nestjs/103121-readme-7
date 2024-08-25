import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { CreatePostDto, UpdatePostDto } from '@project/blog-post';
import { ApplicationServiceURL } from './app.config';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { ApiResponse } from '@nestjs/swagger';
import { BlogPostRdo } from 'libs/blog/blog-post/src/blog-post-module/rdo/blog-post.rdo';
import { BlogPostWithPaginationRdo } from 'libs/blog/blog-post/src/blog-post-module/rdo/blog-post-with-pagination.rdo';
import { BlogPostQuery } from 'libs/blog/blog-post/src/blog-post-module/blog-post.query';
import { CreateRepostDto } from 'libs/blog/blog-post/src/blog-post-module/dto/create-repost.dto';
import { User } from '@project/shared-core';

@Controller('blog')
@UseFilters(AxiosExceptionFilter)
export class BlogController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @ApiResponse({
    type: BlogPostRdo,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/')
  public async create(@Body() dto: CreatePostDto, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Blog}/`,
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
    type: BlogPostWithPaginationRdo,
    status: HttpStatus.OK,
  })
  @Get()
  public async index(@Query() query: BlogPostQuery) {
    const { data } = await this.httpService.axiosRef.get<BlogPostWithPaginationRdo>(
      `${ApplicationServiceURL.Blog}`,
      {
        params: query,
      }
    );

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Get('/feed')
  public async contentRibbon(
    @Query() query: BlogPostQuery,
    @Body() dto: CreateRepostDto,
  ) {
    const { data: userData } = await this.httpService
      .axiosRef.get<User>(`${ApplicationServiceURL.Users}/${dto.userId}`);
    const { data } = await this.httpService.axiosRef.post(
        `${ApplicationServiceURL.Blog}/feed`,
        userData.subscribes,
        {
          params: query,
        }
      );

    return data;
  }

  @ApiResponse({
    type: BlogPostRdo,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get<BlogPostRdo>(`${ApplicationServiceURL.Blog}/${id}`);
    return data;
  }

  @ApiResponse({
    type: BlogPostRdo,
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdatePostDto,
    @Req() req: Request
  ) {
    const { data } = await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.Blog}/${id}`,
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
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async delete(@Param('id') id: string, @Req() req: Request) {
    await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Blog}/${id}`,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );
  }

  @ApiResponse({
    type: BlogPostRdo,
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post(`:postId/reposts`)
  public async createRepost(
    @Param('postId') postId: string,
    @Body() dto: CreateRepostDto,
    @Req() req: Request
  ) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Blog}/${postId}/reposts`,
      dto,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    return data;
  }
}
