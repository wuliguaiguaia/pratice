/*
  6.20 基数排序
  依赖进制，可进行多进制排序
  常用于整数或对字母排序

  【计数排序】与【桶排序】的结合
 */

function radixSort(arr, radixBase = 10) {
    if (arr.length < 1) { return arr; }
    let minValue = arr[0];
    let maxValue = arr[0];
    let len = arr.length;
    let significantDigit = 1;

    for (let i = 1; i < len; i++) {
        let item = arr[i];
        if (item > maxValue) {
            maxValue = item;
        }
        if (item < minValue) {
            minValue = item;
        }
    }

    while ((maxValue - minValue) / significantDigit >= 1) { // 8999, 8998
        arr = countingSortForRadix(arr, radixBase, significantDigit, minValue);
        significantDigit *= radixBase;
    }

    return arr;
}

function countingSortForRadix(arr, radixBase, significantDigit, minValue) {
    let buckets = [];
    let aux = [];
    let len = arr.length;

    for (let i = 0; i < radixBase; i++) {
        buckets[i] = 0;
    }
    for (let i = 0; i < len; i++) {
        let bucketIndex = Math.floor((arr[i] - minValue) / significantDigit) % radixBase;
        buckets[bucketIndex]++;
    }
    for (let i = 1; i < radixBase; i++) {
        buckets[i] += buckets[i - 1];
    }
    for (let i = len - 1; i >= 0; i--) { // 倒序！
        let bucketIndex = Math.floor((arr[i] - minValue) / significantDigit) % radixBase;
        aux[--buckets[bucketIndex]] = arr[i];
    }
    console.log(aux, significantDigit);
    return aux;
}


const arr = [5, 7, 83, 2, 5, 66, 90, 4];
console.log(radixSort(arr));
