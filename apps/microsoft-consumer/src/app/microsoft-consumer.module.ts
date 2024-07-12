import { Module } from '@nestjs/common';

import { MicrosoftConsumerController } from './microsoft-consumer.controller';
import { MicrosoftConsumerService } from './microsoft-consumer.service';

@Module({
  imports: [],
  controllers: [MicrosoftConsumerController],
  providers: [MicrosoftConsumerService],
})
export class MicrosoftConsumerModule {}
