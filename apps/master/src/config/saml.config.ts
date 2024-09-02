import { Allow, IsBoolean, IsString } from 'class-validator';
/**
 * @description 配置 SAML断言（Security Assertion Markup Language）
 * 通过使用 SAML，组织可以实现跨域的单点登录，提高用户体验和安全性，同时简化身份管理流程。
 */
export class SamlConfig {
  @IsString()
  issuer!: string;

  @IsBoolean()
  wantAssertionsSigned!: boolean;

  @IsString()
  @Allow()
  frontendUrl?: string;

  @IsString()
  callbackUrl!: string;
}
