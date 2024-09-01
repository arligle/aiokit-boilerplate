import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';

import { Tenant } from './tenant.entity';
import { BaseTenantEntityHelper } from '@aiokit/typeorm';
import {
  IsBooleanLocalized,
  IsNumberLocalized,
  IsStringCombinedLocalized,
  IsUUIDLocalized,
} from '@aiokit/validation';
import { Expose } from 'class-transformer';

/**
 * SAML（Security Assertion Markup Language，安全断言标记语言）
 * 是一种用于在不同的安全域之间交换认证和授权数据的开放标准。
 * 它主要用于实现单点登录（SSO）功能，使用户能够在多个应用程序或服务之间无缝地进行身份验证，
 * 而无需在每个应用程序中单独登录。
 */

@Entity('saml_configuration')
export class SAMLConfiguration extends BaseTenantEntityHelper {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  @IsUUIDLocalized()
  id!: string;

  @Expose()
  @IsStringCombinedLocalized({
    minLength: 1,
    maxLength: 2048,
  })
  @Column({ type: String, nullable: false, length: 2048 })
  entryPoint!: string;

  @Expose()
  @IsStringCombinedLocalized({
    minLength: 1,
    maxLength: 16_384,
  })
  @Column({ type: String, nullable: false, length: 16_384 })
  certificate!: string;

  @IsBooleanLocalized()
  @Column({ type: Boolean, nullable: false })
  enabled!: boolean;

  @OneToOne(() => Tenant, {
    eager: false,
  })
  @JoinColumn()
  tenant?: Tenant;

  @VersionColumn()
  @IsNumberLocalized()
  @Expose()
  version!: number;
}
