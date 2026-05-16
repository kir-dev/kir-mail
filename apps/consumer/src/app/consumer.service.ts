import { SingleSendRequestDto } from '@kir-mail/types';
import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Job, MetricsTime, Worker } from 'bullmq';

import {
  CONSUMER_NAME,
  DISABLE_EMAILS,
  INTERVAL,
  JOBS_KEEP_AGE,
  MAIL_FROM,
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
      this.logger.log(`Creating queue: ${queueId}`);
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
          removeOnComplete: { age: JOBS_KEEP_AGE },
        })
      );
    }
  }

  async onModuleDestroy() {
    for (const worker of this.workers) {
      await worker.close();
    }
  }

  async process(job: Job<SingleSendRequestDto>) {
    this.logger.log(`Processing job #${job.id} 🔄`);
    try {
      if (DISABLE_EMAILS) {
        this.logger.log(`Email sending disabled, would have sent to: ${job.data.to}`);
      } else {
        await this.mailerService.sendMail({
          to: job.data.to,
          from: `"${job.data.from.name}" <${MAIL_FROM}>`,
          subject: job.data.subject,
          html: job.data.html,
          replyTo: job.data.replyTo,
          attachments: job.data.attachments?.map((a) => ({
            filename: a.filename,
            content: Buffer.from(a.content, 'base64'),
            contentType: a.contentType,
            disposition: a.disposition,
            contentId: a.contentId,
          })),
        });
      }
    } catch (error) {
      this.logger.error(`Job ${job.id} failed with error: ${error} 🚨`);
      throw error;
    }
    this.logger.log(`Job #${job.id} processed ✅`);
  }
}
