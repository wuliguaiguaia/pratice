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