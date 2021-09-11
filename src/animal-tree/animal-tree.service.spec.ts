import { Test, TestingModule } from '@nestjs/testing';
import { AnimalTreeService } from './animal-tree.service';

describe('AnimalTreeService', () => {
  let service: AnimalTreeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimalTreeService],
    }).compile();

    service = module.get<AnimalTreeService>(AnimalTreeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
