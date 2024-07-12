import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { ConfigService } from './app/config.service';
import { MailgunConsumerModule } from './app/mailgun-consumer.module';

async function bootstrap() {
  const config = new ConfigService();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(MailgunConsumerModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'mailgun-consumer',
        brokers: [config.get('kafkaBroker')],
      },
      consumer: {
        groupId: 'consumer',
        allowAutoTopicCreation: true,
      },
    },
  });
  await app.listen();
  Logger.log(`Module is connected to Kafka at ${config.get('kafkaBroker')}`, MailgunConsumerModule.name);
}

bootstrap();
