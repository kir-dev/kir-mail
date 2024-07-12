import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { MailgunConsumerModule } from './app/mailgun-consumer.module';
import { PORT } from './config';

async function bootstrap() {
  const app = await NestFactory.create(MailgunConsumerModule);
  await app.listen(PORT);
  Logger.log(`Module is running on ${PORT}`, MailgunConsumerModule.name);
}

bootstrap();
