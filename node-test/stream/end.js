const Stream = require('stream')

const readableStream = new Stream.Readable({
  read() { }
})
const writableStream = new Stream.Writable()

writableStream._write = (chunk, encoding, next) => {
  console.log(chunk.toString())
  next()
}

readableStream.pipe(writableStream)

readableStream.push('hi!')
readableStream.push('ho!')

writableStream.end()

/* 
  throw er; // Unhandled 'error' event
  Error [ERR_STREAM_WRITE_AFTER_END]: write after end
*/