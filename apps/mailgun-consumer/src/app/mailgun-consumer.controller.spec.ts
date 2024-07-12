import { Test, TestingModule } from '@nestjs/testing';

import { MailgunConsumerController } from './mailgun-consumer.controller';
import { MailgunConsumerService } from './mailgun-consumer.service';

describe('MicrosoftConsumerController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [MailgunConsumerController],
      providers: [MailgunConsumerService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<MailgunConsumerController>(MailgunConsumerController);
      expect(appController.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
