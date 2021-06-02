/**
 * 用户角色映射
 */

export enum roleEnum {
  NORMAL = 2,
  ADMIN = 1,
  SUPER = 0,
}

export const roleMap = {
  [roleEnum.SUPER]: '超级管理员',
  [roleEnum.ADMIN]: '管理员',
  [roleEnum.NORMAL]: '普通用户',
};
