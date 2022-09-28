// setTimout模拟setinterval 随时可停止
// 为什么要模拟？ 为了确保两个任务执行之间有一定的时间差！否则如果有卡顿的时候，会有任务堆积的情况
function timerFn(fn, time) {
    let timer = setTimeout(function cb() {
        fn();
        timer = setTimeout(cb, time);
    }, time);
    return () => {
        clearTimeout(timer);
    };
}
let clear = timerFn(() => {
    console.log(12);
}, 1000);

setTimeout(() => {
    clear();
}, 4000);


function timerFn2(fn, time) {
    let timer = null;
    function execute() {
        timer = setTimeout(() => {
            fn();
            execute();
        }, time);
    }
    execute();
    return () => {
        clearTimeout(timer);
    };
}

// 实现每隔一秒打印 1, 2, 3, 4
// 使用 let 块级作用域
for (let i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i);
    }, i * 1000);
}


// let i = 0;
// let timer = setTimeout(function fn() {
//     console.log(i);
//     i++;
//     if (i > 4) { clearTimeout(timer); return; }
//     let timer = setTimeout(fn, 1000);
// }, 1000);

