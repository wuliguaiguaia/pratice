const Stream = require('stream')

/* 创建可读流 */
const readableStream = new Stream.Readable()
readableStream._read = () => { }

/* 
const readableStream = new Stream.Readable({
  read() { }
}) 
*/

/* 向可读流中发送数据 */
readableStream.push('hi!')
readableStream.push('ho!')

/* 如何从可读流中读取数据？ 使用可写流： */
/* 1、使用可写流 */
const writableStream = new Stream.Writable()
writableStream._write = (chunk, encoding, next) => {
  console.log('_write', chunk.toString())
  next()
}
/* 用户输入 */
process.stdin.pipe(writableStream)


/* 从可读流中获取数据 */
readableStream.pipe(writableStream)

/* 2、使用 readable 事件直接地消费可读流 */
// readableStream.on('readable', () => {
//   console.log('readable', readableStream.read())
// })

// writableStream.end();
/* 发送数据到可写流 */
writableStream.write('hey!\n')


