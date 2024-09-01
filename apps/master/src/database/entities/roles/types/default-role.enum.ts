/**
 * 角色类型:SUPER_ADMIN-超级管理员,ADMIN-管理员,REGULAR_USER-普通用户
 * 对于非特定于租户的默认类型很有用
 * 用户无法更改的默认类型，但可以将用户分配给他们
 * */
export enum RoleType {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  REGULAR_USER = 'REGULAR_USER',
}
