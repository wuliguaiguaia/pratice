/* 
  类型声明文件一般是以 .d.ts 结尾
  用别人的声明文件：@types/xxx; 或者库自带的

  生成 .d.ts 文件：tsc test.ts -d; (但是如果有多个文件 会生成多个文件)（wepack中可以通过配置生成？）

  提供给别人使用：在packages.json 上增加 “types”: "dist/index.d.ts"

  如何给任意js增加类型声明

  如果想给文件增加 tsconfig.json, google tsconfig.json example

*/