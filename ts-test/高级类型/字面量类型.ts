/* 指定几种可选 */
interface Personss {
  name: string;
  sex: 'boy' | 'girl',
  grade: 1 | 2 | 3 | 4 | 5,
  // 可选属性的代替写法
  age: number | string | null
}

const haha: Personss = {
  name: 'well',
  sex: 'girl',
  grade: 1
}

/* 最常用 type 与或搭配 */
type Week = 'Mon' | 'Tus' | 'Wed' | 'Sun'
const week: Week = 'mon'