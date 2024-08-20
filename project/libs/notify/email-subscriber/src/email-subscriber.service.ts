import { Injectable } from '@nestjs/common';

import { EmailSubscriberEntity } from './email-subscriber.entity';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberRepository } from './email-subscriber.repository';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (existsSubscriber) {
      return existsSubscriber;
    }

    const emailSubscriber = new EmailSubscriberEntity(subscriber);
    await this.emailSubscriberRepository.save(emailSubscriber);

    return emailSubscriber;
  }

  public async getSubscribers(): Promise<EmailSubscriberEntity[]> {
    return await this.emailSubscriberRepository.findAll();
  }

  public async updateSubscriber(email: string): Promise<EmailSubscriberEntity> {
    const existSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    const subscriberEntity = new EmailSubscriberEntity(existSubscriber);
    subscriberEntity.lastNotificationDate = new Date();
    return await this.emailSubscriberRepository.update(subscriberEntity);
  }
}
