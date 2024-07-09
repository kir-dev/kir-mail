import { Test, TestingModule } from '@nestjs/testing';

import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [GatewayController],
      providers: [GatewayService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<GatewayController>(GatewayController);
      expect(appController.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
