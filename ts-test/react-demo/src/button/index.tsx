import React from 'react'
import './index.css'

//  以下写法一样，优先使用接口
// （interface 的类型以 I 开始）
// interface IProps {
//   size: string
// }

type IProps = {
  size?: string,
  onclick?: React.MouseEventHandler
}

const Button: React.FunctionComponent<IProps> = (props) =>{
  const { size, children, onclick } = props
  return <button className={`${size}`} onClick={onclick}>
    {children}
  </button>
}
export default Button