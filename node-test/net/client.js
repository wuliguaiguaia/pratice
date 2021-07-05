const net = require('net');
const client = net.connect({ port: 8124 }, function () {
  console.log('client connected');
  client.write('world\n');
});

client.on('data', (data) => {
  console.log(data.toString());
});

client.on('end', () => {
  console.log('client disconnected');
});
