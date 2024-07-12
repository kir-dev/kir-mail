import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

import { MailgunConsumerService } from './mailgun-consumer.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'send',
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [],
  providers: [MailgunConsumerService],
})
export class MailgunConsumerModule {}
