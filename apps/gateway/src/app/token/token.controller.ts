import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateTokenDto, TokenDto, UpdateTokenQuotaDto } from '../../types/token.types';
import { TokenService } from './token.service';

@Controller('token')
@ApiTags('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all tokens', type: TokenDto, isArray: true })
  getTokens(): Promise<TokenDto[]> {
    return this.tokenService.getTokens();
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Create a token', type: TokenDto })
  createToken(@Body() data: CreateTokenDto): Promise<TokenDto> {
    return this.tokenService.createToken(data);
  }

  @Patch(':id/quota')
  @ApiResponse({ status: 200, description: 'Update a token quota', type: TokenDto })
  @ApiParam({ name: 'id', type: 'string' })
  updateTokenQuota(@Param('id') id: string, @Body() data: UpdateTokenQuotaDto): Promise<TokenDto> {
    return this.tokenService.updateTokenQuota(id, data.quota);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Delete a token' })
  @ApiParam({ name: 'id', type: 'string' })
  async deleteToken(@Param('id') id: string): Promise<void> {
    await this.tokenService.deleteToken(id);
  }
}
