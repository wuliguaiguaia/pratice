// 295. 数据流的中位数
// https://leetcode.cn/problems/find-median-from-data-stream/


// 插入排序
var MedianFinder = function () {
    this.arr = [];
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
    let index = this.arr.length;
    for (let i = this.arr.length - 1; i >= 0; i--) {
        if (num < this.arr[i]) {
            index = i;
        }
    }
    this.arr.splice(index, 0, num);
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
    let len = this.arr.length;
    if (len % 2 === 0) {
        let i = len / 2;
        console.log(i);
        return (this.arr[i] + this.arr[i - 1]) / 2;
    } else {
        return this.arr[Math.floor(len / 2)];
    }
};

var obj = new MedianFinder();
obj.addNum(1);
obj.addNum(2);
var param_2 = obj.findMedian();
console.log(obj.arr, param_2);
obj.addNum(3);
param_2 = obj.findMedian();
console.log(obj.arr, param_2);