import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'faculties' })
export class Faculty {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  id!: string;

  @Column({ type: 'varchar', length: 200 })
  Name!: string;

  @Column({ type: 'varchar', length: 200 })
  expertise!: string;

  @Column({ type: 'integer' })
  noOfPublication!: number;
}
