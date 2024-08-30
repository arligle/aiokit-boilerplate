import type { ClsStore } from 'nestjs-cls';
/**
 * 租户异步上下文，从nestjs-cls中继承
 */
export interface TenantClsStore extends ClsStore {
  tenantId?: string;
}
