// 循环打印红黄绿

// 函数式编程 任务划分

// 1
function fn() {
    setTimeout(() => {
        console.log('red');
        setTimeout(() => {
            console.log('green');
            setTimeout(() => {
                console.log('orange');
                fn();
            }, 2000);
        }, 1000);
    }, 3000);
}
// fn()

// 2
function p(color) {
    console.log(color);
}
function task(color, time, cb) {
    setTimeout(() => {
        p(color);
        cb();
    }, time);
}

function fn2() {
    task('red', 3000, () => {
        task('green', 1000, () => {
            task('orange', 2000, fn2);
        });
    });
}