/* udp 服务端 */
const dgram = require('dgram');
const socket = dgram.createSocket('udp4'); /* udp4, udp6 */
socket.on('message', (msg, rinfo) => { /* 数据与远程地址信息 */
  console.log('server got: [' + msg + '] from ' + rinfo.address + ':' + rinfo.port);
});

socket.on('listening', () => {
  const address = socket.address();
  console.log('server listening ' + address.address + ':' + address.port);
});

socket.bind(41234);
