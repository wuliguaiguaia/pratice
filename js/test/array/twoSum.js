/* 两数之和 */

// 1 双重遍历 O(n^2)
// 2 hash O(n) 空间换时间

function twoSum(arr, target) {
    let hash = {};
    for (let i = 0; i < arr.length; i++) {
        let rest = target - arr[i];
        if (hash[rest] !== undefined) {
            return [i, hash[rest]];
        } else {
            hash[arr[i]] = i;
        }
    }
}

// 名之梦
// 值会重复，要求列出所有的情况，返回索引

// hash 存的就是数组了，每次遇到合适的 遍历hash里的进行组合