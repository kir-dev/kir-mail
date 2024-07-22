import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

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
}
