const { createGzip } = require('zlib');
const { pipeline } = require('stream');
const {
  createReadStream,
  createWriteStream
} = require('fs');


const path = require('path');
const filepath = path.resolve(__dirname, 'input.txt')
const filepathdestination = path.resolve(__dirname, 'input.txt.gz');

const gzip = createGzip();

const source = createReadStream(filepath);
const destination = createWriteStream(filepathdestination);

pipeline(source, gzip, destination, (err) => {
  if (err) {
    console.error('发生一个错误:', err);
    process.exitCode = 1;
  }
});
