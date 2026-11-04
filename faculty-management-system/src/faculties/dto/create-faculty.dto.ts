import { IsInt, IsNotEmpty, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateFacultyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  id!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  Name!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  expertise!: string;

  @IsInt()
  @Min(0)
  @Max(2147483647)
  noOfPublication!: number;
}
