const fs = require('fs')
const rs = fs.createReadStream('test.md', { highWaterMark: 11 });
// 床前明???光，疑???地上霜，举头???明月，???头思故乡