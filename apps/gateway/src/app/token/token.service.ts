import { Injectable } from '@nestjs/common';
import { Token } from '@prisma/client';
import * as crypto from 'crypto';

import { CreateTokenDto } from '../../types/token.types';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TokenService {
  constructor(private prisma: PrismaService) {}

  getTokens(): Promise<Token[]> {
    return this.prisma.token.findMany();
  }

  getApiKey(token: string): Promise<Token> {
    return this.prisma.token.findFirst({
      where: {
        value: token,
      },
    });
  }

  checkQuota(token: Token): boolean {
    return token.quota > token.used;
  }

  incrementTokenUsage(token: Token): Promise<Token> {
    return this.prisma.token.update({
      where: {
        id: token.id,
      },
      data: {
        used: {
          increment: 1,
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
