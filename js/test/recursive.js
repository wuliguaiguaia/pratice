function fibona1(n) {
    if (n === 0) { return 0; }
    if (n === 1) { return 1; }
    let f1 = 0;
    let f2 = 1;
    let res = 0;
    for (let i = 2; i <= n; i++) {
        res = f1 + f2;
        f1 = f2;
        f2 = res;
    }
    return res;
}

function fibona2(n) {
    if (n === 0) { return 0; }
    if (n === 1) { return 1; }
    return fibona2(n - 1) + fibona2(n - 2);
}

console.log(fibona2(10));