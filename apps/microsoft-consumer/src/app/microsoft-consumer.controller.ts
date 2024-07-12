import { EmailConsumer } from '@kir-mail/email-consumer';
import { Controller } from '@nestjs/common';

import { MicrosoftConsumerService } from './microsoft-consumer.service';

const MESSAGES_PER_MONTH = 1_000_000;

const RESET_INTERVAL = 10 * 1000;

@Controller()
export class MicrosoftConsumerController extends EmailConsumer {
  constructor(microsoftConsumerService: MicrosoftConsumerService) {
    super(microsoftConsumerService, RESET_INTERVAL, MESSAGES_PER_MONTH, MicrosoftConsumerController.name);
  }
}
