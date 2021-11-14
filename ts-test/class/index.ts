/* 类也是一种类型，表示实例的类型 */


// TypeScript笔记（二）类&函数： https://zhuanlan.zhihu.com/p/88960279

class xd {
  private c: string
  constructor(c) {
    this.c = c;
  }
}
class fd extends xd {
  name: string;
  constructor(name, c) {
    super(c);
    this.name = name;
  }

  say() {
    console.log(this.c);
  }
}
