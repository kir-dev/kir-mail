import { Test, TestingModule } from '@nestjs/testing';

import { MicrosoftConsumerController } from './microsoft-consumer.controller';
import { MicrosoftConsumerService } from './microsoft-consumer.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [MicrosoftConsumerController],
      providers: [MicrosoftConsumerService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<MicrosoftConsumerController>(MicrosoftConsumerController);
      expect(appController.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
