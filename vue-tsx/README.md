### Cannot find module './app.module.scss' or its corresponding type declarations.
当前的项目默认是不认识scss语法
找不到模块“./app.module.scss”或其相应的类型声明。

//解决scss文件报错问题
declare module '*.scss' {
  const sass: any
  export default sass
}
