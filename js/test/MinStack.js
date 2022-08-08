/* 最小栈 */
var MinStack = function () {
    this.arr = [];
    // this.sortArr = [];
    this.min_stack = [Infinity];

};


MinStack.prototype.push = function (val) {
    this.arr.push(val);
    this.min_stack.push(Math.min(this.min_stack[this.min_stack.length - 1], val));
    // 只保存当前位置最小的
    // this.sortArr = this.arr.slice().sort((x, y) => x - y);
};

MinStack.prototype.pop = function () {
    this.arr.pop();
    // this.sortArr = this.arr.slice().sort((x, y) => x - y);
    this.min_stack.pop();

};

MinStack.prototype.top = function () {
    return this.arr[this.arr.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
    // return this.sortArr[0];
    return this.min_stack[this.min_stack.length - 1];

};

let minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();
minStack.pop();
minStack.top();
minStack.getMin();

console.log(minStack);