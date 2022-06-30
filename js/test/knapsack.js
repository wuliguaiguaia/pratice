/* eslint-disable max-depth */
// 无价值版
// 包的最大承载重量是 9，有 5 个不同的物品，每个物品的重量分别是 2，2，4，6，3，求背包中物品总重量的最大值
function knapsack(arr, max) {
    const tempArr = [];
    for (let i = 0; i < arr.length; i++) {
        let val = arr[i];
        tempArr[i] = [];
        if (i === 0) { // 第一次特殊处理
            tempArr[i][0] = true;
            if (val <= max) {
                tempArr[i][val] = true;
            }
        } else {
            let lastArr = tempArr[i - 1];
            tempArr[i] = tempArr[i].concat(lastArr);
            for (let j = 0; j < lastArr.length; j++) {
                if (lastArr[j]) {
                    let v = val + j;
                    if (v <= max) {
                        tempArr[i][v] = true;
                    }
                }
            }
        }
    }
    return tempArr[tempArr.length - 1].length - 1;
}

/* 时间复杂度：O(arr.length * max) 空间复杂福 O(arr.length * (max+1)) */


/* 降低空间复杂度 O(max+1) */
function knapsack1(arr, max) {
    const tempArr = [];
    for (let i = 0; i < arr.length; i++) {
        let val = arr[i];
        if (i === 0) { // 第一次特殊处理
            tempArr[0] = true;
            if (val <= max) {
                tempArr[val] = true;
            }
        } else {
            const ar = tempArr.slice(); // 不可重复
            for (let j = 0; j < ar.length; j++) {
                if (ar[j]) {
                    let v = val + j;
                    if (v <= max) {
                        tempArr[v] = true;
                    }
                }
            }
        }
    }
    return tempArr.length - 1;
}

function knapsack2(arr, max) {
    const tempArr = [];
    tempArr[0] = true;
    if (arr[0] <= max) {
        tempArr[arr[0]] = true;
    }
    for (let i = 1; i < arr.length; ++i) { // 动态规划
        for (let j = max - arr[i]; j >= 0; --j) { // 把第i个物品放入背包
            if (tempArr[j] === true) {
                tempArr[j + arr[i]] = true;
            }
        }
    }
    for (let i = max; i >= 0; --i) { // 输出结果
        if (tempArr[i] === true) { return i; }
    }
    return 0;
}

// console.log(knapsack1([2, 0, 0, 0, 2], 7));
// console.log(knapsack2([2, 0, 0, 0, 2], 7));

/* 增加价值 */
function knapsack3(arr, arr2, max) {
    let tempArr = [];
    for (let i = 0; i < arr.length; ++i) {
        tempArr[i] = [];
        for (let j = 0; j < max + 1; ++j) {
            tempArr[i][j] = -1;
        }
    }
    tempArr[0][0] = 0;
    if (arr[0] <= max) {
        tempArr[0][arr[0]] = arr2[0];
    }
    for (let i = 1; i < arr.length; ++i) { // 动态规划，状态转移
        for (let j = 0; j <= max; ++j) { // 不选择第i个物品
            if (tempArr[i - 1][j] >= 0) {
                tempArr[i][j] = tempArr[i - 1][j];
            }
        }
        for (let j = 0; j <= max - arr[i]; ++j) { // 选择第i个物品
            if (tempArr[i - 1][j] >= 0) {
                let v = tempArr[i - 1][j] + arr2[i];
                if (v > tempArr[i][j + arr[i]]) {
                    tempArr[i][j + arr[i]] = v;
                }
            }
        }
    }
    // console.log(tempArr);
    // 找出最大值
    let maxvalue = -1;
    for (let j = 0; j <= max; ++j) {
        if (tempArr[arr.length - 1][j] > maxvalue) {
            maxvalue = tempArr[arr.length - 1][j];
        }
    }
    return maxvalue;
}

/* 优化空间复杂度为O(max+1) */
function knapsack4(arr, arr2, max) {
    const tempArr = [];
    for (let i = 0; i < arr.length; i++) {
        let val = arr[i];
        let val2 = arr2[i];
        if (i === 0) { // 第一次特殊处理
            tempArr[0] = 0;
            if (val <= max) {
                tempArr[val] = val2;
            }
        } else {
            let ar = tempArr.slice();
            for (let j = 0; j < ar.length; j++) {
                if (ar[j] >= 0) {
                    let v = val + j;
                    if (v <= max) {
                        if (!ar[v] || ar[v] < val2 + ar[j]) {
                            tempArr[v] = val2 + ar[j];
                        }
                    }
                }
            }
        }
    }
    let e = tempArr.filter(v => v);
    // console.log(tempArr);
    return Math.max(...e);

}
console.log(knapsack3([2, 2, 1, 6, 3], [3, 4, 6, 7, 9], 9));
console.log(knapsack4([2, 2, 1, 6, 3], [3, 4, 6, 7, 9], 9));

// 无价值回溯版
function knapsack5(arr, max) {
    let res = 0;
    let curValue = 0;
    fn1(0, arr, max, curValue, arr.length);
    function fn1(i, arr, max, curValue, n) {
        if (curValue === max || i === n) {
            if (curValue > res) {
                res = curValue;
            }
            return;
        }
        fn1(i + 1, arr, max, curValue, n);
        if (arr[i] + curValue <= max) {
            fn1(i + 1, arr, max, arr[i] + curValue, n);
        }
    }
    return res;
}
// console.log(knapsack5([2, 4], 3));


// 有价值回溯版
function knapsack6(arr, arr1, max) {
    let curValue = 0;
    let curCost = 0;
    let maxCost = 0;
    fn(0, curValue, curCost);
    function fn(i, curValue, curCost) {
        if (i === arr.length || curValue === max) {
            if (curCost > maxCost) { maxCost = curCost; }
            return;
        }
        fn(i + 1, curValue, curCost);
        if (curValue + arr[i] < max) {
            fn(i + 1, curValue + arr[i], curCost + arr1[i]);
        }
    }
    return maxCost;
}
console.log(knapsack6([2, 2, 1, 6, 3], [3, 4, 6, 7, 9], 9));

