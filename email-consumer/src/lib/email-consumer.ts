import { SingleSendRequestDto } from '@kir-mail/types';
import { Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext, Payload } from '@nestjs/microservices';
import { Consumer } from 'kafkajs';

import { EmailConsumerService } from './email-consumer-service';

export class EmailConsumer implements OnModuleInit, OnModuleDestroy {
  private logger: Logger;
  private messageCount = 0;
  private startTime = Date.now();
  private interval: NodeJS.Timeout;
  private readonly maxMessagePerInterval: number;

  constructor(
    private readonly emailConsumerService: EmailConsumerService,
    private readonly resetInterval: number,
    maxMessagePerMonth: number,
    context = EmailConsumer.name
  ) {
    this.maxMessagePerInterval = maxMessagePerMonth / ((30 * 24 * 60 * 60 * 1000) / resetInterval);

    this.logger = new Logger(context);
    this.logger.log(`Throttling limit set to ${this.maxMessagePerInterval} messages per ${resetInterval}ms`);
  }

  @EventPattern('send')
  send(@Payload() sendRequestDto: SingleSendRequestDto, @Ctx() context: KafkaContext) {
    if (this.messageCount >= this.maxMessagePerInterval) throw new Error('Throttling limit reached');

    this.emailConsumerService.send(sendRequestDto);

    this.messageCount++;
  }

  onModuleInit() {
    this.interval = setInterval(() => {
      this.messageCount = 0;
    }, this.resetInterval);
  }

  onModuleDestroy() {
    clearInterval(this.interval);
  }

  protected pauseConsumer(consumer: Consumer, topic: string) {
    consumer.pause([{ topic }]);
    const remainingTime = (Date.now() - this.startTime) % this.resetInterval;
    setTimeout(() => {
      consumer.resume([{ topic }]);
    }, remainingTime);
  }
}
