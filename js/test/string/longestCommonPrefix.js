// 最长公共前缀

// 暴力法，比较长度，再 startsWith
var longestCommonPrefix = function (strs) {
    let res = '';
    let minLenStr = strs[0];
    let minLen = strs[0].length;
    for (let i = 1; i < strs.length; i++) {
        let len = strs[i].length;
        if (len < minLenStr) {
            minLen = len;
            minLenStr = strs[i];
        }
    }
    let index = 0;
    while (index < minLen) {
        let str = minLenStr.slice(0, ++index);
        for (let i = 0; i < strs.length; i++) {
            if (!strs[i].startsWith(str)) {
                return res;
            }
        }
        res = str;
    }
    return res;
};


// 缩小长度
var longestCommonPrefix2 = function (strs) {
    let s = strs[0];
    for (let i = 0; i < strs.length; i++) {
        while (!strs[i].startsWith(s)) {
            if (s.length === 0) { return ''; }
            s = s.slice(0, -1);
        }
    }
    return s;
};