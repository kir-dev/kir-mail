import { Test } from '@nestjs/testing';

import { MailgunConsumerService } from './mailgun-consumer.service';

describe('AppService', () => {
  let service: MailgunConsumerService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [MailgunConsumerService],
    }).compile();

    service = app.get<MailgunConsumerService>(MailgunConsumerService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
