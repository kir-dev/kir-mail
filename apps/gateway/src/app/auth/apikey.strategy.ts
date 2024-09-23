import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Token } from '@prisma/client';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

import { TokenService } from '../token/token.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'api-key') {
  constructor(private tokenService: TokenService) {
    super(
      { header: 'Authorization', prefix: 'Api-Key ' },
      false,
      async (apiKey: string, done: (err: UnauthorizedException | null, token?: Token | boolean) => void) => {
        const tokenData = await this.tokenService.getApiKey(apiKey);
        if (tokenData) {
          return done(null, tokenData);
        }
        return done(new UnauthorizedException(), false);
      }
    );
  }
}

@Injectable()
export class ApiKeyGuard extends AuthGuard('api-key') {}
