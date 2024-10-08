import { BatchSendRequestDto, MultipleSendRequestDto, SingleSendRequestDto } from '@kir-mail/types';
import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Job, JobType, Queue } from 'bullmq';

import { QUEUE_IDS, REDIS_HOST, REDIS_PORT } from '../config';
import { AnalyticsData, AnalyticsDto, TimestampsDto } from '../types/response.type';

const DEFAULT_QUEUE = 'send';

@Injectable()
export class GatewayService {
  private readonly logger = new Logger(GatewayService.name);
  private readonly queues: Queue[] = [];
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
    this.queues.push(queue);
  }

  async sendMessage(request: SingleSendRequestDto) {
    const queue = this.getQueueByName(request.queue);
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

  async sendMultiRecipientMessage(request: MultipleSendRequestDto) {
    const queue = this.getQueueByName(request.queue);
    if (!queue) {
      throw new NotFoundException('Direct queue not found');
    }

    try {
      await queue.addBulk(
        request.to.map((to) => ({
          name: 'send',
          data: { ...request, to },
        }))
      );
    } catch (error) {
      this.logger.error(`Failed to add job to queue: ${error}`);
      throw new InternalServerErrorException('Failed to add job to queue');
    }
  }

  async sendBulkMessages(batchRequests: BatchSendRequestDto) {
    const queue = this.getQueueByName(batchRequests.queue);
    batchRequests.messages.forEach((message) => this.overwriteQueue(message, batchRequests.queue));
    try {
      await queue.addBulk(batchRequests.messages.map((message) => ({ name: 'send', data: message })));
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
      const rawJobs: Job<SingleSendRequestDto>[] = [];
      for (const queue of this.queues) {
        const jobsForQueues = await queue.getJobs(type);
        rawJobs.push(...jobsForQueues);
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
      availableQueues: this.queues.map((queue) => queue.name),
    };
  }

  private overwriteQueue(message: SingleSendRequestDto, queue: string | undefined) {
    if (queue) {
      message.queue = queue;
    }
  }

  private getQueueByName(queue: string | undefined): Queue | undefined {
    return queue ? this.queues.find((q) => q.name === queue) : this.getDefaultQueue();
  }

  private getDefaultQueue(): Queue {
    return this.queues.find((queue) => queue.name === DEFAULT_QUEUE);
  }

  private mapJobsToDto(jobs: Job<SingleSendRequestDto>[], status: JobType): AnalyticsData[] {
    return jobs.map((job) => ({
      id: job.id,
      data: job.data,
      status: status,
      timestamp: job.timestamp,
      queue: job.queueName,
      processedBy: job.processedBy,
    }));
  }

  private mapJobsToTimestamps(jobs: AnalyticsData[], status: JobType) {
    return jobs.filter((job) => job.status === status).map((job) => job.timestamp);
  }
}
