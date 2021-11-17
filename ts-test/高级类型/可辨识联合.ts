/* 
  联合类型: ts 通过一个特征值来区分类型
   1 有一个共有的字段
   2 共有字段是可穷举的（不能是 number string 这样有无限值的）
*/

/* 需求：N选1 场景 */
interface Props {
  action: 'update' | 'create';
  id?: number;
  name: string;
}

type Props2 = {
  action: 'create';
  name: string;
} | {
  action: 'update';
  id: number;
  name: string
}

function fna(props: Props2) {
  console.log(props.id); // 类型“Props2”上不存在属性“id”。
}


/* 应用: redux action */

type Action = {
  type: 'ADD',
  payload: number
} | {
  type: 'Destory',
  payload: undefined
} | {
  type: 'GetUser',
  payload: {
    id: number
  }
}
