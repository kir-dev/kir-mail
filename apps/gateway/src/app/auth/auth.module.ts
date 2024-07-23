import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { TokenModule } from '../token/token.module';
import { ApiKeyStrategy } from './apikey.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthSchStrategy } from './authsch.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [AuthService, AuthSchStrategy, JwtStrategy, ApiKeyStrategy],
  controllers: [AuthController],
  imports: [PassportModule, JwtModule, TokenModule],
})
export class AuthModule {}
