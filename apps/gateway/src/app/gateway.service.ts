import { SingleSendRequestDto } from '@kir-mail/types';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Job, Queue } from 'bullmq';

import { AnalyticsDto } from '../types/response.type';

@Injectable()
export class GatewayService {
  private readonly logger = new Logger(GatewayService.name);
  constructor(@InjectQueue('send') private sendQueue: Queue) {}

  async sendMessage(request: SingleSendRequestDto) {
    try {
      await this.sendQueue.add('send', request);
      this.logger.log(`Message queued for sending: ${request.subject}`);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async getData(): Promise<AnalyticsDto> {
    const rawCompletedJobs = await this.sendQueue.getJobs(['completed']);
    const rawFailedJobs = await this.sendQueue.getJobs(['failed']);

    const completedJobs = this.mapJobsToDto(rawCompletedJobs, 'completed');
    const failedJobs = this.mapJobsToDto(rawFailedJobs, 'failed');

    const sortedJobs = [...completedJobs, ...failedJobs].sort((a, b) => b.timestamp - a.timestamp);
    const splitJobs = sortedJobs.slice(0, 100);
    return {
      items: splitJobs,
      completedTimestamps: this.mapJobsToTimestamps(rawCompletedJobs),
      failedTimestamps: this.mapJobsToTimestamps(rawFailedJobs),
    };
  }

  private mapJobsToDto(jobs: Job<SingleSendRequestDto>[], status: string) {
    return jobs.map((job) => ({
      id: job.id,
      data: job.data,
      status: status,
      timestamp: job.timestamp,
    }));
  }

  private mapJobsToTimestamps(jobs: Job<SingleSendRequestDto>[]) {
    return jobs.map((job) => job.timestamp);
  }
}
