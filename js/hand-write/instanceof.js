function instanceof1 (a, b) {
    let proto = a.__proto__;
    let type = b.prototype;
    while (proto !== type && proto !== null) {
        // if (proto === type) { return true; }
        proto = proto.__proto__;
    }
    if(proto === null) return false
    return true;
}

let a = [];
console.log(instanceof1(a, Array)); // true
console.log(instanceof1(Object, Object)); // true
console.log(Object instanceof Object); // true