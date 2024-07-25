import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

import { REDIS_HOST, REDIS_PORT } from '../config';
import { MailgunConsumerService } from './mailgun-consumer.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'send',
      connection: {
        host: REDIS_HOST,
        port: REDIS_PORT,
      },
    }),
  ],
  controllers: [],
  providers: [MailgunConsumerService],
})
export class MailgunConsumerModule {}
