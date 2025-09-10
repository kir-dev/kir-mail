import { Logger, Module } from '@nestjs/common';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';

import { AZURE_EMAIL_CONNECTION_STRING, MAIL_HOST, MAIL_PASS, MAIL_PORT, MAIL_USER } from '../config';
import { ConsumerService } from './consumer.service';
import { AzureEmailProvider } from './email/azure-email.provider';
import { EmailProvider } from './email/email-provider.interface';
import { SmtpEmailProvider } from './email/smtp-email.provider';

@Module({
  imports: [
    // BullModule.registerQueue({
    //   name: 'send',
    //   connection: {
    //     host: REDIS_HOST,
    //     port: REDIS_PORT,
    //   },
    // }),
    MailerModule.forRoot({
      transport: {
        host: MAIL_HOST,
        port: MAIL_PORT,
        tls: 'STARTTLS',
        auth: {
          user: MAIL_USER,
          pass: MAIL_PASS,
        },
      },
      defaults: {
        from: `"Kir-Mail" <noreply@${MAIL_USER.split('@')[1]}>`,
      },
    }),
  ],
  controllers: [],
  providers: [
    ConsumerService,
    {
      provide: EmailProvider,
      useFactory: (mailerService: MailerService) => {
        if (AZURE_EMAIL_CONNECTION_STRING) {
          Logger.log('Using Azure Email Provider', ConsumerModule.name);
          return new AzureEmailProvider();
        }
        Logger.log('Using SMTP Email Provider', ConsumerModule.name);
        return new SmtpEmailProvider(mailerService);
      },
      inject: [MailerService],
    },
  ],
})
export class ConsumerModule {}
