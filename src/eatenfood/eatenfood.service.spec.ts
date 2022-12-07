import { Test, TestingModule } from '@nestjs/testing';
import { EatenFoodService } from './eatenfood.service';

describe('MealsService', () => {
  let service: EatenFoodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EatenFoodService],
    }).compile();

    service = module.get<EatenFoodService>(EatenFoodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
