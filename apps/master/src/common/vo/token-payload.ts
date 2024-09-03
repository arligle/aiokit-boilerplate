import { IAccessTokenPayload, IRefreshTokenPayload } from '@aiokit/auth';
import { TenantInfo } from './tenant-info';

export interface BaseAccessTokenPayload extends IAccessTokenPayload {
  firstName: string;
  lastName: string;
  logoUrl?: string;
}

export interface MultiTenantAccessTokenPayload extends AccessTokenPayload {
  tenants: TenantInfo[];
}

export interface SingleTenantAccessTokenPayload
  extends AccessTokenPayload,
  TenantInfo { }

export type RefreshTokenPayload = IRefreshTokenPayload

/**
 * This export is needed to easily replace the implementation of the interface
 * */
export type AccessTokenPayload = BaseAccessTokenPayload
