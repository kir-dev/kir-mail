import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { MAIL_HOST, MAIL_PASS, MAIL_PORT, MAIL_USER } from '../config';
import { ConsumerService } from './consumer.service';

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
  providers: [ConsumerService],
})
export class ConsumerModule {}
