/*
  1 非常规 ? *
    回溯 / 双指针
*/
function isMatch(str, pattern) {
    let matched = false;
    rematch(0, 0);
    function rematch(si, pj) {
        if (matched) { return; } // 已经匹配上了
        if (pj === pattern.length) {
            if (si === str.length) {
                matched = true;
            }
            return;
        }
        if (pattern[pj] === '*') {
            for (let k = 0; k <= str.length - si; k++) {
                rematch(si + k, pj + 1); // 分叉
            }
        } else if (pattern[pj] === '?') {
            rematch(si, pj + 1); // 分叉
            rematch(si + 1, pj + 1);
        } else if (pattern[pj] === str[si]) {
            rematch(si + 1, pj + 1);
        }
    }
    return matched;
}

// console.log(isMatch('abb', 'ab*'));


/*
  2 常规 ? *
    回溯
*/
function isMatch1(s, p) {
    let matched = false;
    rematch(0, 0);
    function rematch(i, j) {
        if (matched) { return; }
        if (j === p.length) {
            if (i === s.length) { matched = true; }
            return;
        }
        if (p[j + 1] === '*') {
            while (s[i] === p[j]) {
                i++;
                continue;
            }
            rematch(i, j + 2);
        } else if (p[j + 1] === '?') {
            if (s[i] === p[j]) {
                rematch(i + 1, j + 2);
            } else {
                rematch(i, j + 2);
            }
        } else if (s[i] === p[j]) {
            rematch(i + 1, j + 1);
        }
    }
    return matched;
}
// console.log(isMatch1('abccccccccc', 'abc*')); // true
// console.log(isMatch1('aab', 'a*b')); // true
// console.log(isMatch1('b', 'a*b')); // true
// console.log(isMatch1('abc', 'abc?')); // true
// console.log(isMatch1('b', 'a?b')); // true
// console.log(isMatch1('aab', 'a?b')); // false


/*
  3 常规 . *
  回溯
*/

function isMatch2(s, p) {
    let matched = false;
    rematch(0, 0);
    function rematch(i, j) {
        if (matched) { return; }
        if (j === p.length) {
            if (i === s.length) { matched = true; }
            return;
        }
        if (p[j + 1] === '*') {
            if (p[j] === '.') {
                if (j + 2 === p.length) {
                    matched = true;
                    return;
                }
                for (let k = 0; k <= s.length - i; k++) {
                    rematch(i + k, j + 2);
                }
            } else {
                while (s[i] === p[j]) {
                    rematch(i, j + 2);
                    i++;
                }
                rematch(i, j + 2);
            }
        } else if (p[j] === '.' || p[j] === s[i]) {
            rematch(i + 1, j + 1);
        }
    }
    return matched;
}
console.log(isMatch2('aa', 'a*'));
console.log(isMatch2('abb', '.*b'));
console.log(isMatch2('abb', 'a*b'));
console.log(isMatch2('abb', 'a*b*'));
console.log(isMatch2('abb', 'a*.*'));
console.log(isMatch2('b', 'a*.*'));
console.log(isMatch2('mississippi', 'mis*is*ip*.'));
console.log(isMatch2('aabcbcbcaccbcaabc', '.*a*aa*.*b*.c*.*a*'));