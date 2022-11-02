// 剑指 Offer 50. 第一个只出现一次的字符
// https://leetcode.cn/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof/


function firstUniqChar(str) {
    let hash = {};
    for (let i = 0; i < str.length; i++) {
        if (hash[str[i]]) {
            hash[str[i]] = hash[str[i]] + 1;
        } else {
            hash[str[i]] = 1;
        }
    }
    for (let i in hash) {
        if (hash[i] === 1) { return i; }
    }
    return '';
}