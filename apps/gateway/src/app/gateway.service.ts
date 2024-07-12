import { SingleSendRequestDto } from '@kir-mail/types';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class GatewayService {
  private readonly logger = new Logger(GatewayService.name);
  constructor(@InjectQueue('send') private sendQueue: Queue) {}

  async sendMessage(request: SingleSendRequestDto) {
    try {
      await this.sendQueue.add('send', request);
      this.logger.debug(`Message queued for sending: ${request.subject}`);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
