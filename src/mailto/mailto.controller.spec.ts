import { Test, TestingModule } from '@nestjs/testing';
import { MailtoController } from './mailto.controller';
import { MailtoService } from './mailto.service';

describe('MailtoController', () => {
  let controller: MailtoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailtoController],
      providers: [MailtoService],
    }).compile();

    controller = module.get<MailtoController>(MailtoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
