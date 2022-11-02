const { spawn } = require('child_process');
const child = spawn('pwd');


child.on('exit', function (code, signal) {
    console.log('child process exited with' + ` code: ${code} , signal: ${signal}`);
});