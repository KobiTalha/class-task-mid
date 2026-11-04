import { Test, TestingModule } from '@nestjs/testing';
import { FacultiesController } from './faculties.controller.js';
import { FacultiesService } from './faculties.service.js';

describe('FacultiesController', () => {
  let controller: FacultiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacultiesController],
      providers: [{ provide: FacultiesService, useValue: { create: vi.fn() } }],
    }).compile();

    controller = module.get<FacultiesController>(FacultiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
