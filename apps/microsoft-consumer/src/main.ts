import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { MicrosoftConsumerModule } from './app/microsoft-consumer.module';
import { PORT } from './config';

async function bootstrap() {
  const app = await NestFactory.create(MicrosoftConsumerModule);
  await app.listen(PORT);
  Logger.log(`Module is running on ${PORT}`, MicrosoftConsumerModule.name);
}

bootstrap();
