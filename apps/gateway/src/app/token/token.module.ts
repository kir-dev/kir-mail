import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';

@Module({
  providers: [TokenService, PrismaService],
  controllers: [TokenController],
  exports: [TokenService],
})
export class TokenModule {}
