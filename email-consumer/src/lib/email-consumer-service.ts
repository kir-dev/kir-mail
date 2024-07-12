import { SingleSendRequestDto } from '@kir-mail/types';

export interface EmailConsumerService {
  send(requestDto: SingleSendRequestDto): void;
}
