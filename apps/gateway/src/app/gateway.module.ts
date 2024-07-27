import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { TokenModule } from './token/token.module';

@Module({
  imports: [TokenModule, AuthModule],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
