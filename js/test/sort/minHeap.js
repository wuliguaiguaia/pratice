/*
    6.21
    建最大小堆，堆排序

    nlogn
 */
class MinHeap {
    constructor(compareFn) {
        this.heap = [];
        this.compareFn = compareFn;
    }
    insert(value) {
        if (value === null || value === undefined) { return; }
        if (this.size === 0) {
            this.heap.push(value);
            return;
        }
        this.heap.push(value);
        let index = this.size - 1;
        this.shiftUp(index);
    }
    shiftUp(index) {
        let parentIndex = this.getParentIndex(index);
        if (parentIndex >= 0 && this.compareFn(this.heap[index], this.heap[parentIndex]) < 0) {
            this.swap(index, parentIndex);
            this.shiftUp(parentIndex);
        }
    }
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
    get size() {
        return this.heap.length;
    }
    findMinValue() {
        return this.heap[0];
    }
    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }
    getLeftIndex(index) {
        return index * 2 + 1;
    }
    getRightIndex(index) {
        return index * 2 + 2;
    }
    extract() {
        if (this.size === 0) { return null; }
        if (this.size === 1) { return this.heap.shift(); }
        this.swap(0, this.size - 1); // 第一个数尽量的大
        const value = this.heap.pop();
        this.shiftDown(0);
        return value;

    }
    shiftDown(index) {
        const leftIndex = this.getLeftIndex(index);
        const rightIndex = this.getRightIndex(index);
        let element = index;
        if (leftIndex < this.size && this.compareFn(this.heap[leftIndex], this.heap[index]) < 0) {
            element = leftIndex;
        }
        if (rightIndex < this.size && this.compareFn(this.heap[rightIndex], this.heap[element]) < 0) {
            element = rightIndex;
        }
        if (element !== index) {
            this.swap(element, index);
            this.shiftDown(element);
        }
    }
}

function compareFn(a, b) { return a - b; }
let minHeap = new MinHeap(compareFn);
minHeap.insert(9);
minHeap.insert(2);
minHeap.insert(5);
minHeap.insert(8);
minHeap.insert(7);
minHeap.insert(0);
minHeap.insert(6);
console.log(minHeap.heap);
minHeap.extract();
console.log(minHeap.heap);
minHeap.extract();
console.log(minHeap.heap);
minHeap.extract();
console.log(minHeap.heap);

function heapSort(arr) {
    let length = arr.length;
    const heap = buildMaxHeap(arr);
    while (length > 0) {
        arr[--length] = heap.extract();
    }
    return arr;
}

function buildMaxHeap(arr) {
    let heap = new MinHeap(function (a, b) { return b - a; });
    for (let i = 0; i < arr.length; i++) {
        heap.insert(arr[i]);
    }
    return heap;
}

console.log(heapSort([5, 4, 3, 2, 1]));


module.exports = MinHeap;