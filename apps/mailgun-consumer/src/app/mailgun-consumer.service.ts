import { SendRequestJobData } from '@kir-mail/types';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Job, MetricsTime } from 'bullmq';

import { DISABLE_EMAILS, MAIL_USER } from '../config';

const MESSAGES_PER_MONTH = 30_000;

const RESET_INTERVAL = 30 * 24 * 60 * 60 * 1000;

const CONSUMER_NAME = 'mailgun-consumer';

@Processor('send', {
  name: CONSUMER_NAME,
  limiter: {
    max: MESSAGES_PER_MONTH / ((30 * 24 * 60 * 60 * 1000) / RESET_INTERVAL),
    duration: RESET_INTERVAL,
  },
  metrics: {
    maxDataPoints: MetricsTime.ONE_WEEK,
  },
})
@Injectable()
export class MailgunConsumerService extends WorkerHost {
  private readonly logger = new Logger(MailgunConsumerService.name);

  constructor(private readonly mailerService: MailerService) {
    super();
  }

  async process(job: Job<SendRequestJobData>) {
    this.logger.log(`Processing job #${job.id} by ${CONSUMER_NAME}`);
    await job.updateData({ ...job.data, processedBy: CONSUMER_NAME });

    try {
      if (!DISABLE_EMAILS)
        await this.mailerService.sendMail({
          to: job.data.to,
          from: `"${job.data.from}" <noreply@${MAIL_USER.split('@')[1]}>`,
          subject: job.data.subject,
          html: job.data.html,
          replyTo: job.data.replyTo,
        });
    } catch (error) {
      this.logger.error(`Job ${job.id} failed with error: ${error}`);
      throw error;
    }
    await job.updateData({ ...job.data, processedBy: CONSUMER_NAME });
    this.logger.log(`Job #${job.id} processed by ${CONSUMER_NAME}`);
  }
}
