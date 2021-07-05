/* UDP 客户端 */
const dgram = require('dgram');
const message = Buffer.from('hello dgram');
const client = dgram.createSocket('udp4');
/* send(buf, offset(buffer的偏移), length, port, address, [callback]) */
client.send(message, 0, message.length, 41234, 'localhost', (err, bytes) => {
  client.close();
});