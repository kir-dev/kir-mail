import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

import { REDIS_HOST, REDIS_PORT } from '../config';
import { MicrosoftConsumerService } from './microsoft-consumer.service';

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
  providers: [MicrosoftConsumerService],
})
export class MicrosoftConsumerModule {}
