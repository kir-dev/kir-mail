import { SingleSendRequestDto } from '@kir-mail/types';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: 'Message queued for sending' })
  message: string;
}

export class AnalyticsData {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ type: SingleSendRequestDto })
  data: SingleSendRequestDto;

  @ApiProperty({ example: 'completed' })
  status: string;

  @ApiProperty({ example: Date.now() })
  timestamp: number;
}

export class AnalyticsDto {
  @ApiProperty({ type: [AnalyticsData] })
  items: AnalyticsData[];

  @ApiProperty({ type: [Number] })
  completedTimestamps: number[];

  @ApiProperty({ type: [Number] })
  failedTimestamps: number[];
}
