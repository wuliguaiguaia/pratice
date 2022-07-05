/* 硬币找零 */

const { QuickSort1 } = require('./sort/quickSort.js');

// 贪心
function minConChange(coins, amount) {
    if (amount <= 0) { return 0; }
    coins = QuickSort1(coins, function (a, b) { return b - a; });
    let n = 0;
    for (let i = 0; i < coins.length; i++) {
        let x = Math.floor(amount / coins[i]);
        n += x;
        amount -= x * coins[i];
        if (amount === 0) { break; }
    }
    return n;
}

/* 最少硬币找零 */

// 回溯
function minConChange0(coins, amount) {
}

// 动态规划 状态转移表
function minConChange1(coins, amount) {
    if (amount === 0) { return 0; }
    // coins = coins.sort((a, b) => a - b);
    let arr = new Array(amount + 1).fill(Number.MAX_SAFE_INTEGER);
    arr[0] = 0;
    for (let i = 0; i < coins.length; i++) {
        for (let j = coins[i]; j <= amount; j++) {
            if (arr[j - coins[i]] === Number.MAX_SAFE_INTEGER) { continue; }
            arr[j] = Math.min(arr[j - coins[i]] + 1, arr[j]);
        }
    }
    return arr[amount] === Number.MAX_SAFE_INTEGER ? -1 : arr[amount];
}


// 状态转移方程
function minConChange2(coins, amount) {

}

console.log(minConChange2([186, 419, 83, 408], 84));