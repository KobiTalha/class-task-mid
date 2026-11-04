import { Test, TestingModule } from '@nestjs/testing';
import { FacultiesService } from './faculties.service.js';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Faculty } from './entities/faculty.entity.js';

describe('FacultiesService', () => {
  let service: FacultiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FacultiesService,
        {
          provide: getRepositoryToken(Faculty),
          useValue: { create: (value: object) => value, save: async (value: object) => value },
        },
      ],
    }).compile();

    service = module.get<FacultiesService>(FacultiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
