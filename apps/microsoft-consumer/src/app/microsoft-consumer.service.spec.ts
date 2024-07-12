import { Test } from '@nestjs/testing';

import { MicrosoftConsumerService } from './microsoft-consumer.service';

describe('AppService', () => {
  let service: MicrosoftConsumerService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [MicrosoftConsumerService],
    }).compile();

    service = app.get<MicrosoftConsumerService>(MicrosoftConsumerService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
