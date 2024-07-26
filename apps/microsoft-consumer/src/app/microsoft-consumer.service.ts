import { SendRequestJobData } from '@kir-mail/types';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Job, MetricsTime } from 'bullmq';

import { DISABLE_EMAILS, MAIL_USER } from '../config';

const MESSAGES_PER_DAY = 50_000 * 30;

const RESET_INTERVAL = 24 * 60 * 60 * 1000;

const CONSUMER_NAME = 'microsoft-consumer';

@Processor('send', {
  name: CONSUMER_NAME,
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

  async process(job: Job<SendRequestJobData>) {
    this.logger.log(`Processing job #${job.id} by ${CONSUMER_NAME}`);
    await job.updateData({ ...job.data, processedBy: CONSUMER_NAME });

    await new Promise((resolve) => setTimeout(resolve, 10000));
    try {
      if (!DISABLE_EMAILS)
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
    this.logger.log(`Job #${job.id} processed by ${CONSUMER_NAME}`);
  }
}
