;/**
 * @param {number[]} A
 * @param {number} m
 * @param {number[]} B
 * @param {number} n
 * @return {void} Do not return anything, modify A in-place instead.
 */
var merge = function (A, m, B, n) {
  console.log(m == 0, B)
  if (m === 0) {
    console.log('1', B)
    return B
  }
  if (n === 0) return A
  let a = m + n - 1
  m = m - 1;
  n = n - 1;
  while (n >= 0) {
    if (A[m] < B[n]) {
      A[a] = B[n]
      a--
      n--
    } else {
      [A[a], A[m]] = [A[m], A[a]]
      a--
      m--
    }
  }
  return A
};

console.log('---', merge([0],0,[1],1));