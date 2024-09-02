import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Tenant } from '../../database/entities';
import { BaseTypeormTenantedEntityRepository } from '@aiokit/typeorm';
import { TenantClsStore } from '@aiokit/persistence-api';
import { ClsService } from 'nestjs-cls';
// import { BaseTypeormEntityRepository } from '@aiokit/typeorm';

@Injectable()
export class TenantsRepository
  extends BaseTypeormTenantedEntityRepository<
    Tenant,
    'id'
  // 'id' | 'version',
  // 'id' | 'tenantId'
  > {
  constructor(
    @InjectDataSource()
    readonly ds: DataSource,
    clsService: ClsService<TenantClsStore>,
  ) {
    super(Tenant, ds, 'id', clsService);
  }
}
