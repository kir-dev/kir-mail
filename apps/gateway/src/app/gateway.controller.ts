import { SingleSendRequestDto } from '@kir-mail/types';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { RequestWithTokenUser } from '../types/request.types';
import { AnalyticsDto, ResponseDto } from '../types/response.type';
import { ApiKeyGuard } from './auth/apikey.strategy';
import { GatewayService } from './gateway.service';
import { TokenService } from './token/token.service';

@Controller()
@ApiTags('Gateway')
export class GatewayController {
  constructor(
    private readonly gatewayService: GatewayService,
    private readonly tokenService: TokenService
  ) {}

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
  @UseGuards(ApiKeyGuard)
  @ApiResponse({ status: 200, description: 'Send message', type: ResponseDto })
  async sendMessage(
    @Body() sendRequestDto: SingleSendRequestDto,
    @Req() req: RequestWithTokenUser
  ): Promise<ResponseDto> {
    await this.gatewayService.sendMessage(sendRequestDto);
    await this.tokenService.incrementTokenUsage(req.user);
    return {
      status: 200,
      message: 'Message queued for sending',
    };
  }
}
