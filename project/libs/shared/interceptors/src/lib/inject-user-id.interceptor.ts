import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';

@Injectable()
export class InjectUserIdInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    request.body['userId'] = request.user.sub;
    console.log(request.body);

    return next.handle();
  }
}
