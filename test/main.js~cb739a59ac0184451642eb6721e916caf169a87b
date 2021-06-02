function buildMaxHeap(nums) {
  const arr = [nums.shift()];
  let position = 0;
  while (nums.length) {
    arr.push(nums.shift());
    debugger
    position = arr.length - 1;
    let parentIndex = Math.floor((position - 1) / 2);
    while (parentIndex in arr) {
      if (arr[position] > arr[parentIndex]) {
        [arr[position], arr[parentIndex]] = [arr[parentIndex], arr[position]];
        position = parentIndex;
        parentIndex = Math.floor((position - 1) / 2);
      } else {
        break;
      }
    }
  }
  return arr;
}

function heapSort(heap) {
  if (heap.length === 0) return [];
  const res = [];
  let position = 0;
  while (heap.length > 1) {
    [heap[0], heap[heap.length - 1]] = [heap[heap.length - 1], heap[0]];
    res.unshift(heap.pop());
    debugger
    position = 0;
    let left = position * 2 + 1;
    let right = position * 2 + 2;
    while (left in heap || right in heap) {
      let maxIndex = position;
      if (left in heap && heap[left] > heap[maxIndex]) {
        maxIndex = left;
      }
      if (right in heap && heap[right] > heap[maxIndex]) {
        maxIndex = right;
      }
      if (maxIndex === position) break;
      [heap[maxIndex], heap[position]] = [heap[position], heap[maxIndex]];
      position = maxIndex;
      left = position * 2 + 1;
      right = position * 2 + 2;
    }
  }
  res.unshift(heap.pop());
  return res;
}

let arr = buildMaxHeap([1, 6, 0, 5,0, 6, 8, 92, 9, 9,7])
console.log(arr);
console.log(heapSort(arr));