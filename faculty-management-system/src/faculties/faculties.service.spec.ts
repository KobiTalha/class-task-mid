import { Test, TestingModule } from '@nestjs/testing';
import { FacultiesService } from './faculties.service.js';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Faculty } from './entities/faculty.entity.js';

describe('FacultiesService', () => {
  let service: FacultiesService;
  const repository = {
    create: vi.fn((value: object) => value),
    insert: vi.fn(async () => undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FacultiesService,
        {
          provide: getRepositoryToken(Faculty),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<FacultiesService>(FacultiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('saves and returns a faculty with the exact request properties', async () => {
    const faculty = {
      id: '23898-2880-203',
      Name: 'mr. NewFaculty',
      expertise: 'Machine Learning',
      noOfPublication: 30,
    };

    await expect(service.create(faculty)).resolves.toEqual(faculty);
    expect(repository.create).toHaveBeenCalledWith(faculty);
    expect(repository.insert).toHaveBeenCalledWith(faculty);
  });

  it('converts PostgreSQL duplicate key errors into HTTP 409 conflicts', async () => {
    repository.insert.mockRejectedValueOnce({ driverError: { code: '23505' } });

    await expect(
      service.create({
        id: '23898-2880-203',
        Name: 'mr. NewFaculty',
        expertise: 'Machine Learning',
        noOfPublication: 30,
      }),
    ).rejects.toMatchObject({
      status: 409,
      response: { message: 'A faculty with this id already exists.' },
    });
  });
});
