import { Body, Controller, HttpStatus, Post, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { NotifyDto } from '@project/eamil-subscriber';

@ApiTags('notifications')
@Controller('notifications')
@UseFilters(AxiosExceptionFilter)
export class NotificationController {
  constructor(private readonly httpService: HttpService) {}

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('notify-posts')
  public async subscribe(@Body() dto: NotifyDto, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Blog}/notify`,
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
