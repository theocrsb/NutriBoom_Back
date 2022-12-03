import { Test, TestingModule } from '@nestjs/testing';
import { ExercicesController } from './exercices.controller';
import { ExercicesService } from './exercices.service';

describe('ExercicesController', () => {
  let controller: ExercicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExercicesController],
      providers: [ExercicesService],
    }).compile();

    controller = module.get<ExercicesController>(ExercicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
