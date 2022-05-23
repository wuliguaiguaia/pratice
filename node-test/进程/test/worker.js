// worker.js 子进程文件
const http = require('http');
const process = require('process');

const server = http.createServer(
    (req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/plain',
        });
        res.end('handle by child');
    }
);

process.on('message', (m, tcp) => {
    if (m === 'server') {
        tcp.on('connection', socket => {
            server.emit('connection', socket);
        });
    }
});