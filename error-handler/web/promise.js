// Promise 中的异常不能被 try-catch 和 window.onerror 捕获，
// 这时候我们就需要监听 unhandledrejection 来帮我们捕获这部分错误。

/* 
window.addEventListener('unhandledrejection', function (e) {
    e.preventDefault();
    console.log('捕获到 promise 错误了');
    console.log('错误的原因是', e.reason);
    console.log('Promise 对象是', e.promise);
    return true;
});

Promise.reject('promise1 error');
new Promise((resolve, reject) => {
    reject('promise2 error');
});
new Promise((resolve) => {
    resolve();
}).then(() => {
    throw 'promise3 error';
}); 

*/

// const p = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('-------')
//             reject('test')
//         }, 1000);
//     })
// }

// // promise catch 可以捕获await错误，await属于是同步错误
// new Promise((res) => {res()}).then(async () => {
//     const x = await p()
//     console.log(x);
// }).catch((err) => {
//     console.log('hhhhh', err)
// })

const p = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('-------')
            resolve(1)
        }, 1000);
    })
}
p().then((res)=>{
    if(res === 1) {
        // console.log(res,'then')
        // // throw Error(1)
        // return Promise.reject(2)
        www ={}
        www.a()
    }
}).catch((e)=>{
    if(e instanceof Error) {
        console.log(e.name, e.message)
    }
    console.log(e,'catch')
})

