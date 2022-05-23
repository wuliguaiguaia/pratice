// master.js 主进程文件
const fork = require('child_process').fork;
const cpus = require('os').cpus();
const net = require('net');
const server = net.createServer();

server.listen(8080);

const workers = {};
const createWorker = function () {
    const worker = fork('./worker.js');
    worker.on('exit', () => {
        console.log(`进程退出：${worker.pid}`);
        delete workers[worker.pid];
        createWorker();
    });
    worker.send('server', server);
    workers[worker.pid] = worker;
    console.log(`进程创建：${worker.pid}`);
};

for (let i = 0; i < 2; i++) { // 12个
    createWorker();
}

// 服务器只有 二核，如果同时有三个进程呢
