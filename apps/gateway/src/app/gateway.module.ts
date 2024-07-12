import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { ConfigService } from './config.service';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';

@Module({
  imports: [],
  controllers: [GatewayController],
  providers: [
    GatewayService,
    {
      provide: 'KAFKA_CLIENT',
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'gateway',
              brokers: [configService.get('kafkaBroker')],
            },
            producer: {
              allowAutoTopicCreation: true,
            },
          },
        }),
      inject: [ConfigService],
    },
    ConfigService,
  ],
})
export class GatewayModule {}
