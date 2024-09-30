import { BatchSendRequestDto, MultipleSendRequestDto, SingleSendRequestDto } from '@kir-mail/types';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

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
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Get data', type: AnalyticsDto })
  getData(): Promise<AnalyticsDto> {
    return this.gatewayService.getData();
  }

  @Post('send')
  @UseGuards(ApiKeyGuard)
  @ApiResponse({ status: 200, description: 'Send message', type: ResponseDto })
  @ApiBearerAuth('Api-Key')
  async sendMessage(
    @Body() sendRequestDto: SingleSendRequestDto,
    @Req() req: RequestWithTokenUser
  ): Promise<ResponseDto> {
    this.tokenService.checkQuota(req.user, 1);
    await this.gatewayService.sendMessage(sendRequestDto);
    await this.tokenService.incrementTokenUsage(req.user);
    return {
      status: 200,
      message: 'Message queued for sending',
    };
  }

  @Post('send-to-many')
  @UseGuards(ApiKeyGuard)
  @ApiResponse({ status: 200, description: 'Send message to many recipients', type: ResponseDto })
  @ApiBearerAuth('Api-Key')
  async sendMultiRecipientMessage(
    @Body() sendRequestDto: MultipleSendRequestDto,
    @Req() req: RequestWithTokenUser
  ): Promise<ResponseDto> {
    this.tokenService.checkQuota(req.user, sendRequestDto.to.length);
    await this.gatewayService.sendMultiRecipientMessage(sendRequestDto);
    await this.tokenService.incrementTokenUsage(req.user, sendRequestDto.to.length);
    return {
      status: 200,
      message: 'Messages queued for sending',
    };
  }

  @Post('send-bulk')
  @UseGuards(ApiKeyGuard)
  @ApiResponse({ status: 200, description: 'Send messages in bulk', type: ResponseDto })
  @ApiBearerAuth('Api-Key')
  async sendBulkMessages(
    @Body() batchSendRequestDto: BatchSendRequestDto,
    @Req() req: RequestWithTokenUser
  ): Promise<ResponseDto> {
    this.tokenService.checkQuota(req.user, batchSendRequestDto.messages.length);
    await this.gatewayService.sendBulkMessages(batchSendRequestDto);
    await this.tokenService.incrementTokenUsage(req.user, batchSendRequestDto.messages.length);
    return {
      status: 200,
      message: `${batchSendRequestDto.messages.length} messages queued for sending`,
    };
  }
}
