import { SingleSendRequestDto } from '@kir-mail/types';
import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { MAIL_FROM } from '../../config';
import { EmailProvider } from './email-provider.interface';

@Injectable()
export class SmtpEmailProvider implements EmailProvider {
  private readonly logger = new Logger(SmtpEmailProvider.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(data: SingleSendRequestDto): Promise<void> {
    this.logger.log(`Sending email to: ${data.to}`);

    try {
      await this.mailerService.sendMail({
        to: data.to,
        from: `"${data.from.name}" <${MAIL_FROM}>`,
        subject: data.subject,
        html: data.html,
        replyTo: data.replyTo,
      });
      this.logger.log(`Email sent to ${data.to} successfully`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${data.to}: ${error}`);
      throw error;
    }
  }
}
