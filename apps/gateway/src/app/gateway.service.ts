import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewayService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
