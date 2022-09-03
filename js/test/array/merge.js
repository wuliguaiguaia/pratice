//  合并区间
// https://leetcode.cn/problems/SsGoHC/

// 1 排序后比较
var merge = function (intervals) {
    intervals = intervals.sort((x, y) => x[0] - y[0]);
    for (let i = 0; i < intervals.length - 1; i++) {
        if (intervals[i + 1][0] <= intervals[i][1]
        ) {
            intervals[i + 1] = [intervals[i][0], Math.max(intervals[i][1], intervals[i + 1][1])];
            intervals.splice(i, 1);
            i--;
        }
    }
    return intervals;
};