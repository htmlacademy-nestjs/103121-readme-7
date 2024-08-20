import { HttpService } from '@nestjs/axios';
import 'multer';
import { Body, Controller, Get, HttpStatus, Param, Post, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';

import { CreateUserDto, LoginUserDto, AuthenticationResponseMessage, LoggedUserRdo, DetailedUserRdo } from '@project/authentication';
import { UploadedFileRdo } from '@project/file-uploader';

import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import FormData from 'form-data';
import { ChangePasswordDto } from 'libs/account/authentication/src/dto/change-password.dto';
import { UserRdo } from 'libs/account/authentication/src/rdo/user.rdo';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { MongoIdValidationPipe } from '@project/pipes';

@ApiTags('users')
@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @ApiResponse({
    type: CreateUserDto,
    status: HttpStatus.CREATED,
    description: AuthenticationResponseMessage.UserCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationResponseMessage.UserExist,
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post('register')
  public async register(@Body() user: CreateUserDto, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      const formData = new FormData();

      formData.append('file', file.buffer, file.originalname);

      const { data } = await this.httpService.axiosRef.post<UploadedFileRdo>(
        `${ApplicationServiceURL.File}/upload`,
        formData
      );

      user.avatar = data.id;
    }

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/register`, user);
    return data;
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.LoggedSuccess,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseMessage.LoggedError,
  })
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, loginUserDto);
    return data;
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: AuthenticationResponseMessage.PasswordChanged,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('password')
  public async changePassword(
    @Body() dto: ChangePasswordDto,
    @Req() req: Request
  ) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/password`,
      dto,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );
    return data;
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/refresh`,
      null,
      {
        headers: {
          'Authorization': req.headers['authorization']
        }
      }
    );

    return data;
  }

  @ApiResponse({
    type: DetailedUserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.UserFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound,
  })
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Users}/${id}`
    );
    const { data: dataCount } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Blog}/${id}/count`
    );

    return {
      ...data,
      postsCount: dataCount,
    };
  }
}
