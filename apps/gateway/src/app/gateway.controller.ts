import { SingleSendRequestDto } from '@kir-mail/types';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AnalyticsDto, ResponseDto } from '../types/response.type';
import { GatewayService } from './gateway.service';

@Controller()
@ApiTags('Gateway')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get('health')
  @ApiResponse({ status: 200, description: 'Health check' })
  getHealth(): string {
    return 'OK 💌';
  }

  @Get('data')
  @ApiResponse({ status: 200, description: 'Get data', type: AnalyticsDto })
  getData(): Promise<AnalyticsDto> {
    return this.gatewayService.getData();
  }

  @Post('send')
  @ApiResponse({ status: 200, description: 'Send message', type: ResponseDto })
  async sendMessage(@Body() sendRequestDto: SingleSendRequestDto): Promise<ResponseDto> {
    await this.gatewayService.sendMessage(sendRequestDto);
    return {
      status: 200,
      message: 'Message queued for sending',
    };
  }
}
