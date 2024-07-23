import { ApiProperty } from '@nestjs/swagger';
import { Token } from '@prisma/client';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateTokenDto {
  @ApiProperty({ example: 'New Token' })
  @IsString()
  name: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  quota: number;
}

export class UpdateTokenQuotaDto {
  @ApiProperty({ example: 100 })
  @IsNumber()
  @IsPositive()
  quota: number;
}

export class TokenDto implements Token {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: new Date() })
  createdAt: Date;

  @ApiProperty({ example: new Date() })
  updatedAt: Date;

  @ApiProperty({ example: 'New Token' })
  name: string;

  @ApiProperty({ example: 'tokenvalue' })
  value: string;

  @ApiProperty({ example: 100 })
  quota: number;

  @ApiProperty({ example: 0 })
  used: number;
}
