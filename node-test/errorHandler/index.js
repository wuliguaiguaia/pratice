console.log(12);


/* try {
  throw new Error('fsd')
} catch (e) {
  console.log(e,'==');
} */

process.on('uncaughtException', err => {
  console.error('有一个未捕获的错误', err)
  process.exit(1) //强制性的（根据 Node.js 文档）
})

throw new Error('fsd')

