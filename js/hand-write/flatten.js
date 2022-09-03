function flatten(arr, depth) {
    return arr.reduce((res, item) => {
        if (Array.isArray(item)) {
            if (depth > 0) {
                res = res.concat(flatten(item, depth - 1));
            } else {
                res.push(item);
            }
        } else {
            res.push(item);
        }
        return res;
    }, []);
}

let a = [1, [2, [3, [4, [5]]]]];
console.log(flatten(a, 3));