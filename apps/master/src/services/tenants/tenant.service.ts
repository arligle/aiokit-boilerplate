// import { Injectable, Logger } from '@nestjs/common';
// import { Transactional } from 'typeorm-transactional';
// import { Tenant, UserProfile } from '../../database/entities';
// import { TenantsRepository } from '../../repositories';
// // import { BaseEntityService } from '@aiokit/typeorm-service';
// import { ConflictEntityCreationException } from '@aiokit/exceptions';
// import { TenantStatus } from '../../database/entities/tenants/vo/tenant-status.enum';
// import { BaseTrackedEntityService } from '@aiokit/service-api';
// // import { BaseEntityService } from '@aiokit/service-api';

// // TODO: BaseEntityService TO BaseTrackedEntityService
// @Injectable()
// export class TenantService extends BaseTrackedEntityService<
//   Tenant,
//   'id',
//   TenantsRepository,
//   Pick<Tenant, 'id' | 'version'>
// > {
//   private readonly logger = new Logger(TenantService.name);

//   constructor(tenantsRepository: TenantsRepository) {
//     super(tenantsRepository);
//   }

//   @Transactional()
//   async setupTenant(
//     tenantName: string,
//     tenantFriendlyIdentifier: string,
//     owner: UserProfile,
//   ) {
//     const numberOfTenantsByIdentifier = await this.repository.count({
//       where: {
//         tenantFriendlyIdentifier,
//       },
//     });

//     if (numberOfTenantsByIdentifier > 0) {
//       throw new ConflictEntityCreationException(
//         'Tenant',
//         'tenantFriendlyIdentifier',
//         tenantFriendlyIdentifier,
//       );
//     }

//     const tenant = await this.repository.createOrUpdate({
//       tenantName,
//       tenantFriendlyIdentifier,
//       tenantStatus: TenantStatus.ACTIVE,
//       owner,
//     });

//     this.logger.log(`Tenant ${tenantName} created with id ${tenant.id}`);

//     return tenant;
//   }
// }
