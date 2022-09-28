function flatten(arr, depth) {
    if (depth <= 0) { return arr; }
    return arr.reduce((res, item) => {
        if (Array.isArray(item)) {
            item = flatten(item, depth - 1);
        }
        res = res.concat(item);
        return res;
    }, []);
}

let a = [1, [2, [3, [4, [5]]]]];
console.log(flatten(a, 2));