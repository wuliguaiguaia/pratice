// 用两个栈实现列表
// 不能用shift()
var CQueue = function () {
    this.arr1 = [];
    this.arr2 = [];
};

CQueue.prototype.appendTail = function (value) {
    this.arr1.push(value);
};

CQueue.prototype.deleteHead = function () {
    const { arr1, arr2 } = this;
    if (arr2.length === 0) {
        while (arr1.length) {
            arr2.push(arr1.pop());
        }
    }
    if (arr2.length === 0) { return -1; }
    return arr2.pop();
};

// 用两个列表实现栈
// 不能用pop()
var CQueue2 = function () {
    this.arr1 = [];
    this.arr2 = [];
};

CQueue2.prototype.appendTail = function (value) {
    if (this.arr1.length) {
        this.arr1.push(value);
    } else {
        this.arr2.push(value);
    }
};

CQueue2.prototype.deleteHead = function () {
    const { arr1, arr2 } = this;
    if (!arr1.length && !arr2.length) { return -1; }
    if (arr2.length === 0) {
        while (arr1.length > 1) {
            arr2.push(arr1.shift());
        }
        return arr1.shift();
    } else {
        while (arr2.length > 1) {
            arr1.push(arr2.shift());
        }
        return arr2.shift();
    }
};