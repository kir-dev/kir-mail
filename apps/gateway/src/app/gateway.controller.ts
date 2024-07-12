import { SingleSendRequestDto } from '@kir-mail/types';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { ResponseDto } from '../types/response.type';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get('health')
  getHealth(): string {
    return 'OK 💌';
  }

  @Post('send')
  sendMessage(@Body() sendRequestDto: SingleSendRequestDto): ResponseDto {
    this.gatewayService.sendMessage(sendRequestDto);
    return new ResponseDto(200, 'Message queued for sending');
  }
}
