import { HttpService } from '@nestjs/axios';
import 'multer';
import { Body, Controller, HttpStatus, Post, Req, UploadedFile, UseFilters, UseInterceptors } from '@nestjs/common';

import { CreateUserDto, LoginUserDto, AuthenticationResponseMessage, LoggedUserRdo } from '@project/authentication';
import { UploadedFileRdo } from '@project/file-uploader';

import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import FormData from 'form-data';

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

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }
}
