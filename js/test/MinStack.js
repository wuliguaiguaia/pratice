/* 最小栈 */
// https://leetcode.cn/problems/min-stack

class MinStack {
    constructor() {
        this.arr = [];
        this.minArr = [];
    }
    getMin() {
        return this.minArr[this.minArr.length - 1];
    }
    pop() {
        this.arr.pop();
        this.minArr.pop();
    }
    top() {
        return this.arr[this.arr.length - 1];
    }
    push(val) {
        let min = this.getMin() ?? Number.MAX_SAFE_INTEGER;
        this.arr.push(val);
        this.minArr.push(Math.min(min, val));
    }
}

let minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();
minStack.pop();
minStack.top();
minStack.getMin();

console.log(minStack);