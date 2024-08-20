import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';

import { RabbitRouting } from '@project/shared-core';
import { rabbitConfig } from '@project/account-config';
import { CreatePostDto } from '@project/blog-post';

@Injectable()
export class NotifyBlogService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async sendNewPosts(posts: CreatePostDto[]) {
    return this.rabbitClient.publish<CreatePostDto[]>(
      this.rabbitOptions.exchange,
      RabbitRouting.NewPosts,
      posts
    );
  }
}
