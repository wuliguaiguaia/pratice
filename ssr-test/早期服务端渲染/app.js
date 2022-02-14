const http = require('http');
const fs = require('fs');
const path = require('path');
const server = http.createServer();
server.on('request', (req, res) => {
    const filePath = path.join(__dirname, './index.template.html');
    let fileContent = fs.readFileSync(filePath, 'utf8');
    const data = getData();
    const compileHtml = compile(fileContent, data);
    res.end(compileHtml);
});
server.listen(3003, (e) => {
    console.log('服务运行在 localhost:3003');
});

function getData() {
    return {
        username: 'alias',
        account: 10000000000000,
    };
}
function compile(fileContent, data) {
    const string = fileContent.replace(/\{\{(\w+)\}\}/g, (_, w) => {
        return data[w];
    });
    return string;
}