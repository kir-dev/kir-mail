import { HttpException, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

import { Token } from '../../generated/client.js';
import { CreateTokenDto } from '../../types/token.types';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TokenService {
  constructor(private prisma: PrismaService) {}

  getTokens(): Promise<Token[]> {
    return this.prisma.token.findMany();
  }

  async getApiKey(token: string): Promise<Token | null> {
    return await this.prisma.token.findFirst({
      where: {
        value: token,
      },
    });
  }

  checkQuota(token: Token, request = 1): void {
    if (token.quota - token.used < request) {
      throw new HttpException('Quota exceeded', 429);
    }
  }

  incrementTokenUsage(token: Token, by = 1): Promise<Token> {
    return this.prisma.token.update({
      where: {
        id: token.id,
      },
      data: {
        used: {
          increment: by,
        },
      },
    });
  }

  updateTokenQuota(id: string, quota: number): Promise<Token> {
    return this.prisma.token.update({
      where: {
        id,
      },
      data: {
        quota,
      },
    });
  }

  createToken(data: CreateTokenDto): Promise<Token> {
    return this.prisma.token.create({
      data: {
        value: this.generateToken(),
        name: data.name,
        quota: data.quota,
      },
    });
  }

  async deleteToken(id: string): Promise<void> {
    await this.prisma.token.delete({
      where: {
        id,
      },
    });
  }

  private generateToken(): string {
    return crypto.randomBytes(16).toString('hex');
  }
}
