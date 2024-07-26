import { SendRequestJobData, SingleSendRequestDto } from '@kir-mail/types';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Job, JobType, Queue } from 'bullmq';

import { AnalyticsData, AnalyticsDto, TimestampsDto } from '../types/response.type';

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
    const types: JobType[] = [
      'completed',
      'failed',
      'active',
      'delayed',
      'waiting',
      'waiting-children',
      'prioritized',
      'paused',
      'repeat',
    ];

    const jobs: AnalyticsData[] = [];

    for (const type of types) {
      const rawJobs = await this.sendQueue.getJobs([type]);
      jobs.push(...this.mapJobsToDto(rawJobs, type));
    }

    const sortedJobs = jobs.sort((a, b) => b.timestamp - a.timestamp);
    const splitJobs = sortedJobs.filter((job) => job.timestamp > Date.now() - 24 * 60 * 60 * 1000);

    const timestamps = types.reduce<TimestampsDto>((acc, type) => {
      acc[type] = this.mapJobsToTimestamps(splitJobs, type);
      return acc;
    }, new TimestampsDto());

    return {
      items: splitJobs,
      timestamps: timestamps,
    };
  }

  private mapJobsToDto(jobs: Job<SendRequestJobData>[], status: JobType): AnalyticsData[] {
    return jobs.map((job) => ({
      id: job.id,
      data: job.data,
      status: status,
      timestamp: job.timestamp,
    }));
  }

  private mapJobsToTimestamps(jobs: AnalyticsData[], status: JobType) {
    return jobs.filter((job) => job.status === status).map((job) => job.timestamp);
  }
}
