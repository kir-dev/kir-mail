import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

import { REDIS_HOST, REDIS_PORT } from '../config';
import { AuthModule } from './auth/auth.module';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    TokenModule,
    AuthModule,
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
