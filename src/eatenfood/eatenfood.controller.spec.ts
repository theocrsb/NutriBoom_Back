import { Test, TestingModule } from '@nestjs/testing';
import { EatenFoodController } from './eatenfood.controller';
import { EatenFoodService } from './eatenfood.service';

describe('MealsController', () => {
  let controller: EatenFoodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EatenFoodController],
      providers: [EatenFoodService],
    }).compile();

    controller = module.get<EatenFoodController>(EatenFoodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
