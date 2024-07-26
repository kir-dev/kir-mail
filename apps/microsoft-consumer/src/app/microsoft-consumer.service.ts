import { SingleSendRequestDto } from '@kir-mail/types';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Job, MetricsTime } from 'bullmq';

import { MAIL_USER } from '../config';

const MESSAGES_PER_DAY = 50_000 * 30;

const RESET_INTERVAL = 24 * 60 * 60 * 1000;

@Processor('send', {
  name: 'microsoft-consumer',
  limiter: {
    max: MESSAGES_PER_DAY / ((30 * 24 * 60 * 60 * 1000) / RESET_INTERVAL),
    duration: RESET_INTERVAL,
  },
  metrics: {
    maxDataPoints: MetricsTime.ONE_WEEK,
  },
})
@Injectable()
export class MicrosoftConsumerService extends WorkerHost {
  private readonly logger = new Logger(MicrosoftConsumerService.name);

  constructor(private readonly mailerService: MailerService) {
    super();
  }

  async process(job: Job<SingleSendRequestDto>) {
    this.logger.log(`Processing job #${job.id}`);
    try {
      await this.mailerService.sendMail({
        to: job.data.to,
        from: `"${job.data.from}" <${MAIL_USER}>`,
        subject: job.data.subject,
        html: job.data.html,
      });
    } catch (error) {
      this.logger.error(`Job ${job.id} failed with error: ${error}`);
      throw error;
    }
    this.logger.log(`Job #${job.id} processed`);
  }
}
