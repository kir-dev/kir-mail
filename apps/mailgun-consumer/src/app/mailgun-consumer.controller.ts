import { EmailConsumer } from '@kir-mail/email-consumer';
import { Controller } from '@nestjs/common';

import { MailgunConsumerService } from './mailgun-consumer.service';

const MESSAGES_PER_MONTH = 1_000_000;

const RESET_INTERVAL = 10 * 1000;

@Controller()
export class MailgunConsumerController extends EmailConsumer {
  constructor(mailgunConsumerService: MailgunConsumerService) {
    super(mailgunConsumerService, RESET_INTERVAL, MESSAGES_PER_MONTH, MailgunConsumerController.name);
  }
}
