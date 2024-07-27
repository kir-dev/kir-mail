import { SendRequestJobData } from '@kir-mail/types';
import { ApiProperty } from '@nestjs/swagger';
import { JobType } from 'bullmq';

export class ResponseDto {
  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: 'Message queued for sending' })
  message: string;
}

export class AnalyticsData {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ type: SendRequestJobData })
  data: SendRequestJobData;

  @ApiProperty({
    example: 'completed',
    enum: [
      'completed',
      'failed',
      'active',
      'delayed',
      'waiting',
      'waiting-children',
      'prioritized',
      'paused',
      'repeat',
      'wait',
    ],
  })
  status: JobType;

  @ApiProperty({ example: Date.now() })
  timestamp: number;

  @ApiProperty({ example: 'send' })
  queue: string;
}

export class TimestampsDto {
  @ApiProperty({ type: [Number] })
  completed: number[];

  @ApiProperty({ type: [Number] })
  failed: number[];

  @ApiProperty({ type: [Number] })
  active: number[];

  @ApiProperty({ type: [Number] })
  delayed: number[];

  @ApiProperty({ type: [Number] })
  waiting: number[];

  @ApiProperty({ type: [Number] })
  'waiting-children': number[];

  @ApiProperty({ type: [Number] })
  prioritized: number[];

  @ApiProperty({ type: [Number] })
  paused: number[];

  @ApiProperty({ type: [Number] })
  repeat: number[];

  @ApiProperty({ type: [Number] })
  wait: number[];
}

export class AnalyticsDto {
  @ApiProperty({ type: [AnalyticsData] })
  items: AnalyticsData[];

  @ApiProperty({
    type: TimestampsDto,
  })
  timestamps: TimestampsDto;

  @ApiProperty({ type: [String] })
  availableQueues: string[];
}
