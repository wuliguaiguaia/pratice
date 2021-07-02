const buf = Buffer.from('Hey!')

for (const item of buf) {
  console.log(item) //72 101 121 33
  /* Unicode 码，用于标识 buffer 位置中的字符（H => 72、e => 101、y => 121）。 */
}


console.log(buf.toString()); // Hey!

console.log(buf.length); // 4

buf.write('hhaaaaha');
console.log(buf.toString()); // hhaa 长度为4

const buf2 = Buffer.alloc(8)
buf2.write('hhaaaaha')
console.log(buf2.toString()); // hhaaaaha


/* 复制 buffer */
let bufcopy = Buffer.alloc(2) // 分配 2 个字节
buf.copy(bufcopy, 0, 0, 2) // 开始位置、结束位置、以及新的 buffer 长度
console.log(bufcopy.toString()); // hh


