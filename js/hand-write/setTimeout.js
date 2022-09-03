// 实现每隔一秒打印 1, 2, 3, 4
// 使用 let 块级作用域
for (let i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i);
    }, i * 1000);
}


let i = 0;
let timer = setTimeout(function fn() {
    console.log(i);
    i++;
    if (i > 4) { clearTimeout(timer); return; }
    let timer = setTimeout(fn, 1000);
}, 1000);