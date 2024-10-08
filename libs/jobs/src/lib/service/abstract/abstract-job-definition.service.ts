import { BaseJobDefinitionEntity, JobDefinition } from '../../entity';
import { BaseTrackedEntityService } from '@aiokit/service-api';
import { BaseTrackedEntityHelper } from '@aiokit/typeorm';
import {
  AbstractRepository,
  ITrackedRepository,
} from '@aiokit/persistence-api';
import { JobDefinitionRepository } from '../../repository';

export abstract class AbstractJobDefinitionService<
  T extends BaseJobDefinitionEntity = JobDefinition,
  FIELDS_REQUIRED_FOR_UPDATE extends keyof T = 'id',
  AUTOGENERATED_FIELDS extends keyof T = keyof BaseTrackedEntityHelper | 'id',
  REPOSITORY extends AbstractRepository<
    T,
    'id',
    unknown,
    FIELDS_REQUIRED_FOR_UPDATE,
    AUTOGENERATED_FIELDS
  > &
  ITrackedRepository<T, 'id', unknown> = JobDefinitionRepository<
    T,
    'id',
    FIELDS_REQUIRED_FOR_UPDATE,
    AUTOGENERATED_FIELDS
  >,
> extends BaseTrackedEntityService<
  T,
  'id',
  REPOSITORY,
  FIELDS_REQUIRED_FOR_UPDATE,
  AUTOGENERATED_FIELDS
> { }
