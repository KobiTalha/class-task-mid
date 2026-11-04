import { PartialType } from '@nestjs/mapped-types';
import { CreateFacultyDto } from './create-faculty.dto.js';

export class UpdateFacultyDto extends PartialType(CreateFacultyDto) {}
