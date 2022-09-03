// type 通过 & 联合类型； interface 通过 extends 扩展类型

type B = {
  b: string
}

type A = {
  a: number
} & B


const o: A = {
  a: 1,
  b:'o'
}
console.log(o);


