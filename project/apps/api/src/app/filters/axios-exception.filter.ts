import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AxiosError } from 'axios';

const INTERNAL_SERVER_ERROR_MESSAGE = 'Internal server error';

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
  catch(error: AxiosError<HttpException>, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = error.response?.data.message || INTERNAL_SERVER_ERROR_MESSAGE;
    const errorCause = error.response?.statusText || error.message;

    response
      .status(status)
      .json({
        message,
        error: errorCause,
        statusCode: status,
      });
  }
}
