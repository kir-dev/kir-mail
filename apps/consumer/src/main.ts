import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ConsumerModule } from './app/consumer.module';
import { PORT } from './config';

async function bootstrap() {
  const app = await NestFactory.create(ConsumerModule);
  await app.listen(PORT);
  Logger.log(`Module is running on ${PORT}`, ConsumerModule.name);
}

bootstrap();
