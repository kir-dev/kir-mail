import { SingleSendRequestDto } from '@kir-mail/types';
import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class GatewayService {
  private readonly logger = new Logger(GatewayService.name);
  constructor(@Inject('KAFKA_CLIENT') private kafkaClient: ClientKafka) {}

  sendMessage(request: SingleSendRequestDto): void {
    try {
      this.kafkaClient.emit('send', request);
      this.logger.debug(`Message queued for sending: ${request.subject}`);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
