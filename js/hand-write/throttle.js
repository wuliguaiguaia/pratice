// 节流
function throttle(fn, t) {
    let cd = true;
    return function (...args) {
        if (!cd) { return; }
        fn.apply(this, args);
        cd = false;
        setTimeout(() => {
            cd = true;
        }, t);
    };
}
