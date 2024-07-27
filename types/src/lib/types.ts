import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class SingleSendRequestDto {
  @ApiProperty({ example: 'Kir-Dev' })
  @IsString()
  @Length(1, 50)
  from: string;

  @ApiProperty({ example: 'test@kir-dev.hu' })
  @IsEmail()
  @Length(1, 50)
  to: string;

  @ApiProperty({ example: 'Test' })
  @IsString()
  subject: string;

  @ApiProperty({ example: '<h1>Hello, World!</h1>' })
  @IsString()
  html: string;

  @ApiProperty({ example: 'replyto@kir-dev.hu' })
  @IsEmail()
  @IsOptional()
  replyTo?: string;

  @ApiProperty({ example: 'send' })
  @IsString()
  @IsOptional()
  queue?: string;
}

export class SendRequestJobData extends SingleSendRequestDto {
  @ApiProperty({ example: 'consumer' })
  @IsString()
  @IsOptional()
  processedBy?: string;
}

export class UserDto {
  @ApiProperty({ example: 'Test User' })
  @IsString()
  displayName: string;
}
