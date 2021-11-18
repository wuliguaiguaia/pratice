/**
 * 自定义 业务状态码
 */

export enum ApiErrorCode {
  SUCCESS = 0,
  LOGIN_EXPIRED = 10001,
  PARAM_ERROR = 10002,
  NOT_LOGIN = 10003,
  VALIDATE_ERROR = 10004,
  NOT_VALUABLE_USER_ID = 11005,
  NOT_HAVE_AUTH = 11006,

  SYSTEM_EXCEPTION_ERROR = 110001,
  TABLE_OPERATE_ERROR = 110002,
}

export const ApiErrorMap = {
  [ApiErrorCode.SUCCESS]: 'success',
  [ApiErrorCode.LOGIN_EXPIRED]: '登录过期',
  [ApiErrorCode.PARAM_ERROR]: '参数错误',
  [ApiErrorCode.NOT_LOGIN]: '用户未登录',
  [ApiErrorCode.VALIDATE_ERROR]: '验证异常',
  [ApiErrorCode.NOT_VALUABLE_USER_ID]: '用户不存在',
  [ApiErrorCode.NOT_HAVE_AUTH]: '无操作权限',

  [ApiErrorCode.SYSTEM_EXCEPTION_ERROR]: '系统异常',
  [ApiErrorCode.TABLE_OPERATE_ERROR]: '数据库操作异常',
};
