// 无重复字符的最长子串

// map 存储索引，遇到重复重置当前 子串长度
var lengthOfLongestSubstring = function (s) {
    let res = 0;
    let cur = 0;
    let map = new Map();
    for (let i = 0; i < s.length; i++) {
        if (map.has(s[i])) {
            let val = map.get(s[i]);
            cur = i - (val + 1) < cur ? i - (val + 1) : cur; // 遇到相同的一定是减小的，否则就和 map 和前面重复了，如 abba
        }
        map.set(s[i], i);
        cur += 1;
        res = Math.max(cur, res);
    }
    return res;
};