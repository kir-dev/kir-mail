import { SendRequestJobData } from '@kir-mail/types';
import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Job, MetricsTime, Worker } from 'bullmq';

import {
  CONSUMER_NAME,
  DISABLE_EMAILS,
  INTERVAL,
  MAIL_USER,
  MAX_MESSAGES_PER_INTERVAL,
  QUEUE_IDS,
  REDIS_HOST,
  REDIS_PORT,
} from '../config';

@Injectable()
export class ConsumerService implements OnModuleDestroy {
  private readonly logger = new Logger(CONSUMER_NAME);
  private readonly workers: Worker[] = [];

  constructor(private readonly mailerService: MailerService) {
    for (const queueId of QUEUE_IDS) {
      this.logger.log(`Creating direct queue: ${queueId}`);
      this.workers.push(
        new Worker(queueId, this.process.bind(this), {
          connection: {
            host: REDIS_HOST,
            port: REDIS_PORT,
          },
          metrics: {
            maxDataPoints: MetricsTime.ONE_WEEK,
          },
          name: CONSUMER_NAME,
          limiter: {
            max: MAX_MESSAGES_PER_INTERVAL / QUEUE_IDS.length,
            duration: INTERVAL,
          },
        })
      );
    }
  }

  async onModuleDestroy() {
    for (const worker of this.workers) {
      await worker.close();
    }
  }

  async process(job: Job<SendRequestJobData>) {
    this.logger.log(`Processing job #${job.id} 🔄`);
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
      this.logger.error(`Job ${job.id} failed with error: ${error} 🚨`);
      throw error;
    }
    await job.updateData({ ...job.data, processedBy: CONSUMER_NAME });
    this.logger.log(`Job #${job.id} processed ✅`);
  }
}
