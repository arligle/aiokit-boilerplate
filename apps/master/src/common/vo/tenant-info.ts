import { TenantInfo as DefaultTenantInfo } from '@aiokit/auth';
import { RoleType } from '../../database/entities/roles/types/default-role.enum';

export type TenantInfo = DefaultTenantInfo<RoleType>
