import { Test, TestingModule } from '@nestjs/testing';
import { MailtoService } from './mailto.service';

describe('MailtoService', () => {
  let service: MailtoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailtoService],
    }).compile();

    service = module.get<MailtoService>(MailtoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
