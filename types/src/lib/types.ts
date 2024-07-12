import { IsEmail, IsString, Length } from 'class-validator';

export class SingleSendRequestDto {
  @IsString()
  @Length(1, 50)
  from: string;

  @IsEmail()
  @Length(1, 50)
  to: string;

  @IsString()
  subject: string;

  @IsString()
  html: string;
}
