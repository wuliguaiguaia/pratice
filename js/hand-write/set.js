/* eslint-disable no-case-declarations */


// 引用类型去重

function setFn(arr) {
    for (let i = 0; i < arr.length; i++) {
        let item1 = arr[i];
        for (let j = i + 1; j < arr.length; j++) {
            let item2 = arr[j];
            if (isEqual(item1, item2)) {
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}

function getType(item) {
    return Object.prototype.toString.call(item).slice(8, -1).toLowerCase();
}

function isEqual(item1, item2) {
    let type1 = getType(item1);
    let type2 = getType(item2);
    if (type1 !== type2) {
        return false;
    }
    switch (type1) {
        case 'number':
        case 'boolean':
        case 'string':
            return item1 === item2;
        case 'array':
            if (item1.length !== item2.length) { return false; }
            for (let i = 0; i < item1.length; i++) {
                if (!isEqual(item1[i], item2[i])) { return false; }
            }
            return true;
        case 'object':
            let keys1 = Object.keys(item1).sort();
            let keys2 = Object.keys(item2).sort();
            if (!isEqual(keys1, keys2)) { return false; }
            for (let i in item1) {
                if (!isEqual(item1[i], item2[i])) { return false; }
            }
            return true;
    }
}

console.log(setFn([
    [{ a: 1, c: 1 }],
    [{ c: 1, a: 1 }]]
));
