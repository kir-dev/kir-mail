import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { GatewayModule } from './app/gateway.module';
import { PORT } from './config';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  await app.listen(PORT);
  Logger.log(`🚀 Application is running on: http://localhost:${PORT}/${globalPrefix}`, GatewayModule.name);
}

bootstrap();
