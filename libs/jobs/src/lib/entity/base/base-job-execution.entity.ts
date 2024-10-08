import { BaseTrackedEntityHelper } from '@aiokit/typeorm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { IsStringEnumLocalized, IsUUIDLocalized } from '@aiokit/validation';
import { JobStatus } from '../vo';

export class BaseJobExecution extends BaseTrackedEntityHelper {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  @IsUUIDLocalized()
  id!: string;

  @Expose()
  @Column({
    type: 'enum',
    enum: JobStatus,
    nullable: false,
  })
  @IsStringEnumLocalized(JobStatus)
  jobStatus!: JobStatus;

  @Column({ type: String, nullable: true, length: 255 })
  bullToken?: string;

  @Expose()
  @Column({ type: String, nullable: false })
  jobVersionId!: string;

  @Expose()
  @Column({ type: 'int', nullable: false, default: 0 })
  progress: number = 0;

  @Expose()
  @Column('jsonb', { nullable: true })
  stepData?: object;
}
