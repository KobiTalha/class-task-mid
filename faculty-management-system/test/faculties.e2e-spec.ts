import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FacultiesController } from '../src/faculties/faculties.controller.js';
import { FacultiesService } from '../src/faculties/faculties.service.js';
import { Faculty } from '../src/faculties/entities/faculty.entity.js';

describe('Faculties API (e2e)', () => {
  let app: INestApplication;
  const savedFaculty = {
    id: '23898-2880-203',
    Name: 'mr. NewFaculty',
    expertise: 'Machine Learning',
    noOfPublication: 30,
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [FacultiesController],
      providers: [
        FacultiesService,
        {
          provide: getRepositoryToken(Faculty),
          useValue: { create: (value: object) => value, save: async (value: object) => value },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
    );
    await app.init();
  });

  afterEach(async () => app.close());

  it('creates and returns a faculty at the required endpoint', async () => {
    await request(app.getHttpServer())
      .post('/faculties/create-faculty')
      .send(savedFaculty)
      .expect(201)
      .expect(savedFaculty);
  });

  it('rejects a request that omits a required field', async () => {
    const { noOfPublication: _publicationCount, ...invalidFaculty } = savedFaculty;
    await request(app.getHttpServer())
      .post('/faculties/create-faculty')
      .send(invalidFaculty)
      .expect(400);
  });
});
