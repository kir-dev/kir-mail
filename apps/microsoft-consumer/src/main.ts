import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { ConfigService } from './app/config.service';
import { MicrosoftConsumerModule } from './app/microsoft-consumer.module';

async function bootstrap() {
  const config = new ConfigService();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(MicrosoftConsumerModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'microsoft-consumer',
        brokers: [config.get('kafkaBroker')],
      },
      consumer: {
        groupId: 'consumer',
        allowAutoTopicCreation: true,
      },
    },
  });
  await app.listen();
  Logger.log(`Module is connected to Kafka at ${config.get('kafkaBroker')}`, MicrosoftConsumerModule.name);
}

bootstrap();
