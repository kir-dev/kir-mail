import { EmailClient, EmailMessage } from '@azure/communication-email';
import { SingleSendRequestDto } from '@kir-mail/types';
import { Injectable, Logger } from '@nestjs/common';

import { AZURE_EMAIL_CONNECTION_STRING, AZURE_EMAIL_SENDER } from '../../config';
import { EmailProvider } from './email-provider.interface';

@Injectable()
export class AzureEmailProvider implements EmailProvider {
  private readonly logger = new Logger(AzureEmailProvider.name);
  private readonly emailClient: EmailClient;

  constructor() {
    if (!AZURE_EMAIL_CONNECTION_STRING) {
      throw new Error('Azure Email Connection String is not configured');
    }
    this.emailClient = new EmailClient(AZURE_EMAIL_CONNECTION_STRING);
  }

  async sendEmail(data: SingleSendRequestDto): Promise<void> {
    this.logger.log(`Sending email to: ${data.to}`);

    try {
      const message: EmailMessage = {
        senderAddress: AZURE_EMAIL_SENDER,
        content: {
          subject: data.subject,
          html: data.html,
        },
        recipients: {
          to: [
            {
              address: data.to,
              displayName: data.to,
            },
          ],
        },
        replyTo: data.replyTo ? [{ address: data.replyTo }] : undefined,
      };

      const poller = await this.emailClient.beginSend(message);
      const result = await poller.pollUntilDone();

      this.logger.log(`Email sent to ${data.to} successfully with ID: ${result.id}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${data.to}: ${error}`);
      throw error;
    }
  }
}
