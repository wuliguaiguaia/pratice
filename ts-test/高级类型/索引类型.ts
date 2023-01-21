// 索引类型：访问带有方括号的对象的方式称为索引签名。 它广泛用于具有未知字符串键和特定值的对象类型
/* 检查动态属性名 */

{
  interface Person2 {
    [k: string]: string;
  }

  const fqw: Person2 = {
    name: 'fsd',
    d: 78
  }
}