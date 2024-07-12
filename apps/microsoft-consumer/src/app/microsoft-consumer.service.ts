import { SingleSendRequestDto } from '@kir-mail/types';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bullmq';

const MESSAGES_PER_MONTH = 1_000_000;

const RESET_INTERVAL = 10 * 1000;

@Processor('send', {
  limiter: {
    max: MESSAGES_PER_MONTH / ((30 * 24 * 60 * 60 * 1000) / RESET_INTERVAL),
    duration: RESET_INTERVAL,
  },
})
@Injectable()
export class MicrosoftConsumerService extends WorkerHost {
  private readonly logger = new Logger(MicrosoftConsumerService.name);
  process(job: Job<SingleSendRequestDto>) {
    this.logger.log(`Processing job: ${job.id} with data: ${JSON.stringify(job.data)}`);
    return Promise.resolve(undefined);
  }
}
