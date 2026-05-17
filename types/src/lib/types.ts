import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsIn, IsOptional, IsString, Length, ValidateNested } from 'class-validator';

export class FromDto {
  @ApiProperty({ example: 'Kir-Dev' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'noreply@kir-dev.hu' })
  @IsEmail()
  email: string;
}

export class AttachmentDto {
  @ApiProperty({ example: 'invoice.pdf' })
  @IsString()
  filename: string;

  @ApiProperty({ example: 'base64EncodedString==' })
  @IsString()
  content: string;

  @ApiProperty({ example: 'application/pdf', required: false })
  @IsString()
  @IsOptional()
  contentType?: string;

  @ApiProperty({ example: 'inline', required: false })
  @IsString()
  @IsOptional()
  @IsIn(['attachment', 'inline'])
  disposition?: string;

  @ApiProperty({ example: 'my-image', required: false })
  @IsString()
  @IsOptional()
  contentId?: string;
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

  @ApiProperty({ type: [AttachmentDto], required: false })
  @ValidateNested({ each: true })
  @Type(() => AttachmentDto)
  @IsArray()
  @IsOptional()
  attachments?: AttachmentDto[];

  @ApiProperty({ example: 'send', required: false })
  @IsString()
  @IsOptional()
  queue?: string;
}

export class MultipleSendRequestDto {
  @ApiProperty({ type: FromDto })
  @ValidateNested()
  from: FromDto;

  @ApiProperty({ example: ['test1@kir-dev.hu', 'test2@kir-dev.hu'] })
  @IsEmail({}, { each: true })
  @Length(1, 50, { each: true })
  to: string[];

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

  @ApiProperty({ type: [AttachmentDto], required: false })
  @ValidateNested({ each: true })
  @Type(() => AttachmentDto)
  @IsArray()
  @IsOptional()
  attachments?: AttachmentDto[];

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
