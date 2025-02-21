// const 断言：只读、不可扩展
// https://juejin.cn/post/6844903848939634696

// 不可扩展类型
let x1 = 1 // 默认 number
let y1 = 2 as const;
x1 = 2;
y1 = 3

// 只读
let action1 = { type: 'INCREMENT' } as const; // y has type 'x'`
action1.type  = 'ss'

// 只读在redux的应用 const assertion；const 断言 
const setCount = (n: number) => {
    return <const>{
      type: 'SET_COUNT',
      payload: n
    }
}
const action = setCount(3);

