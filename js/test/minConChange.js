/* 硬币找零 */

const { QuickSort1 } = require('./sort/quickSort.js');

// 迭代
function minConChange(coins, amount) {
    if (amount <= 0) { return 0; }
    coins = QuickSort1(coins, function (a, b) { return b - a; });
    let n = 0;
    for (let i = 0; i < coins.length; i++) {
        let x = Math.floor(amount / coins[i]);
        n += x;
        amount -= x * coins[i];
    }
    return n;
}

// 动态规划

console.log(minConChange([1, 3, 45], 6));