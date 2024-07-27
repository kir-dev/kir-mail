import { SendRequestJobData, SingleSendRequestDto } from '@kir-mail/types';
import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Job, JobType, Queue } from 'bullmq';

import { QUEUE_IDS, REDIS_HOST, REDIS_PORT } from '../config';
import { AnalyticsData, AnalyticsDto, TimestampsDto } from '../types/response.type';

const DEFAULT_QUEUE = 'send';

@Injectable()
export class GatewayService {
  private readonly logger = new Logger(GatewayService.name);
  private readonly directQueues: Queue[] = [];
  constructor() {
    this.createQueue(DEFAULT_QUEUE);
    QUEUE_IDS.forEach((queueId) => this.createQueue(queueId));
  }

  private createQueue(name: string) {
    this.logger.log(`Creating queue: ${name}`);
    const queue = new Queue(name, {
      connection: {
        host: REDIS_HOST,
        port: REDIS_PORT,
      },
      defaultJobOptions: {
        attempts: 5,
        backoff: {
          type: 'exponential',
          delay: 5000,
        },
      },
    });
    this.directQueues.push(queue);
  }

  async sendMessage(request: SingleSendRequestDto) {
    const queue = this.getQueueForRequest(request);
    if (!queue) {
      throw new NotFoundException('Direct queue not found');
    }

    try {
      await queue.add('send', request);
    } catch (error) {
      this.logger.error(`Failed to add job to queue: ${error}`);
      throw new InternalServerErrorException('Failed to add job to queue');
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
      let rawJobs: Job<SendRequestJobData>[] = [];
      for (const queue of this.directQueues) {
        rawJobs = await queue.getJobs(type);
      }
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
      availableQueues: this.directQueues.map((queue) => queue.name),
    };
  }

  private getQueueForRequest(request: SingleSendRequestDto): Queue | undefined {
    if (request.directQueue) {
      return this.directQueues.find((queue) => queue.name === request.directQueue);
    }
    return this.getDefaultQueue();
  }

  private getDefaultQueue(): Queue {
    return this.directQueues.find((queue) => queue.name === DEFAULT_QUEUE);
  }

  private mapJobsToDto(jobs: Job<SendRequestJobData>[], status: JobType): AnalyticsData[] {
    return jobs.map((job) => ({
      id: job.id,
      data: job.data,
      status: status,
      timestamp: job.timestamp,
      queue: job.queueName,
    }));
  }

  private mapJobsToTimestamps(jobs: AnalyticsData[], status: JobType) {
    return jobs.filter((job) => job.status === status).map((job) => job.timestamp);
  }
}
