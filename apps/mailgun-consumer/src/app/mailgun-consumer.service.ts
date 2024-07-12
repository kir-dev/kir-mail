import { EmailConsumerService } from '@kir-mail/email-consumer';
import { SingleSendRequestDto } from '@kir-mail/types';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailgunConsumerService implements EmailConsumerService {
  private counter = 0;
  private readonly logger = new Logger(MailgunConsumerService.name);
  send(sendRequest: SingleSendRequestDto) {
    this.randomError();
    this.counter++;
    this.logger.log(`Sending email to ${sendRequest.to}, counter: ${this.counter}`);
  }

  private randomError() {
    if (Math.random() < 0.1) {
      throw new Error('Random error occurred');
    }
  }
}
