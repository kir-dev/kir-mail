import { Module } from '@nestjs/common';

import { MailgunConsumerController } from './mailgun-consumer.controller';
import { MailgunConsumerService } from './mailgun-consumer.service';

@Module({
  imports: [],
  controllers: [MailgunConsumerController],
  providers: [MailgunConsumerService],
})
export class MailgunConsumerModule {}
