// https://leetcode.cn/problems/permutation-in-string/solution/by-flix-ix7f/

// 字符串的排列

// 滑动窗口

function checkInclusion(s1, s2) {
    let m = s1.length;
    let n = s2.length;
    if (m > n) { return false; }
    let cnt = getCount(s1); // s1 字符数量
    let need = m;
    for (let right in s2) {
        let ch = s2[right];
        // 窗口右边界
        if (ch in cnt) {
            if (cnt[ch] > 0) {
                need -= 1;
            }
            cnt[ch] -= 1;
        }
        // 窗口左边界
        let left = right - m;
        if (left >= 0) {
            ch = s2[left];
            if (ch in cnt) {
                if (cnt[ch] >= 0) {
                    need += 1;
                }
                cnt[ch] += 1;
            }
        }

        if (need === 0) {
            return true;
        }
    }
    return false;
}

function getCount(s) {
    return s.split('').reduce((res, item) => {
        if (res[item]) {
            res[item]++;
        } else {
            res[item] = 0;
        }
        return res;
    }, {});
}