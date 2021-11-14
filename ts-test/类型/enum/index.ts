/* 
  enum
  取值被限定在一定范围内的场景 
*/
enum test {
  ch,
  zh
}
/* 默认0开始 */
console.log(test.ch); // 0

/* 反向映射 */
console.log(test[0]); // ch

/* 自定义枚举值 */
enum test2 {
  chy = 2,
  en,
  math = 6.5,

  /* 枚举值可以是非数值 */
  gg = 's'
}
console.log(test2[2]); // chy

/* 未赋值接着上一个 */
console.log(test2.en); // 3

console.log(test2[6.5]); // math

console.log(test2.gg); // s


/* 外部枚举 */
declare enum test3 {

}


/* eg.1 */
enum MysqlDataType {
  TINYINT = 'tinyint',
  INT = 'int',
  BIGINT = 'bigint',

  DATE = 'date',
  DATETIME = 'datetime',
  TIMESTAMP = 'timestamp',

  CHAR = 'char',
  VARCHAR = 'varchar',
  TEXT = 'text',
  LONGTEXT = 'longtext',

  BOOLEAN = '',
}


/* eg.2 */
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