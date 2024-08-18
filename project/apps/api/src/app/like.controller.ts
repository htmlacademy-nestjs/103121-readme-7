import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { ApplicationServiceURL } from './app.config';
import { LikeDto } from '@project/blog-like';

@Controller('likes')
@UseFilters(AxiosExceptionFilter)
export class LikeController {
  constructor(private readonly httpService: HttpService) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post(`:postId`)
  public async createLike(@Param('postId') postId: string, @Body() dto: LikeDto, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Blog}/${postId}/likes`,
      dto,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Delete(`:postId`)
  public async deleteLike(@Param('postId') postId: string, @Body() dto: LikeDto, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Blog}/${postId}/likes`,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
        data: dto,
      }
    );

    return data;
  }
}
