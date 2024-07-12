import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

import { REDIS_HOST, REDIS_PORT } from '../config';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'send',
      connection: {
        host: REDIS_HOST,
        port: REDIS_PORT,
      },
    }),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
