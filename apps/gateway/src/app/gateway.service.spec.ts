import { Test } from '@nestjs/testing';

import { GatewayService } from './gateway.service';

describe('AppService', () => {
  let service: GatewayService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [GatewayService],
    }).compile();

    service = app.get<GatewayService>(GatewayService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
