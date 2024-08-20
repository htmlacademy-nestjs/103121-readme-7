import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { Post, RabbitRouting } from '@project/shared-core';
import { MailService } from './mail-module/mail.service';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'readme.notify.queue',
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
    this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.NewPosts,
    queue: 'readme.notify.posts',
  })
  public async sendNewPosts(posts: Post[]): Promise<void> {
    const subscribers = await this.subscriberService.getSubscribers();

    subscribers.forEach((subscriber) => {
      const lastPosts = posts.filter(
        (post) => new Date(post.createdAt) >= new Date(subscriber.lastNotificationDate)
      );

      if (lastPosts.length === 0) {
        return undefined;
      }
      this.mailService.sendNotifyNewPosts(subscribers, lastPosts);
      this.subscriberService.updateSubscriber(subscriber.email);
    });
  }
}
