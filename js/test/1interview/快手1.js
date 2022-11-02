// promise 事件池

function createRequest({ pool }) {
    let num = 0;
    let queue = [];
    const request = (url, param) => {
        queue.push([url, param]);
        execute();
    };
    const execute = () => {
        if (num < pool) {
            num = num + 1;
            const data = queue.shift();
            fetch(...data).then(() => {
                num = num - 1;
                if (queue.length !== 0) {
                    execute();
                }
            });
        }
    };
    return request;
}


function fetch(url, param) {
    return new Promise((res) => {
        setTimeout(() => {
            console.log(url, '请求成功', String(new Date(Date.now())).slice(15, 25));
            res(url);
        }, 1000); // 时间不一样时
    });
}


const myRequest = createRequest({ pool: 2 }); // 同时只有两个任务

const urlList = (Array.from(new Array(10))).map((item, idx) => ({
    url: idx,
    param: idx,
}));

urlList.map(item => myRequest(item.url, item.param));

