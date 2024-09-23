import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length, ValidateNested } from 'class-validator';

export class FromDto {
  @ApiProperty({ example: 'Kir-Dev' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'noreply@kir-dev.hu' })
  @IsEmail()
  email: string;
}

export class SingleSendRequestDto {
  @ApiProperty({ type: FromDto })
  @ValidateNested()
  from: FromDto;

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

  @ApiProperty({ example: 'replyto@kir-dev.hu', required: false })
  @IsEmail()
  @IsOptional()
  replyTo?: string;

  @ApiProperty({ example: 'send', required: false })
  @IsString()
  @IsOptional()
  queue?: string;
}

export class UserDto {
  @ApiProperty({ example: 'Test User' })
  @IsString()
  displayName: string;
}

export class BatchSendRequestDto {
  @ApiProperty({ type: [SingleSendRequestDto] })
  @ValidateNested({ each: true })
  messages: SingleSendRequestDto[];

  @ApiProperty({ example: 'send', required: false })
  @IsString()
  @IsOptional()
  queue?: string;
}
