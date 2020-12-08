/***1\***/
const getArrayValues = () => {
  // 在此处创建2D arrary
  const values = [[], []]

  // 将值插入第一个数组
  for (let y = 0; y < 600; y++) {
    values[0].push([])
    values[1].push([])

    // 将值插入第二个数组
    for (let x = 0; x < 600; x++) {
      values[0][y].push(Math.random())
      values[1][y].push(Math.random())
    }
  }

  // 返回填充数组
  return values
}

getArrayValues()


/***2\***/
const { GPU } = require('gpu.js')
const gpu = new GPU();
const multiplyLargeValues = gpu.createKernel(function (a, b) {
  let sum = 0;
  for (let i = 0; i < 600; i++) {
    sum += a[this.thread.y][i] * b[i][this.thread.x];
  }
  return sum;
}).setOutput([600, 600])
const largeArray = getArrayValues()
const out = multiplyLargeValues(largeArray[0], largeArray[1])
