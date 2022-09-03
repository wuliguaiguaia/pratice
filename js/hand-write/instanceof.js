function instanceof1 (a, b) {
    let proto = a.__proto__;
    let type = b.prototype;
    while (proto) {
        if (proto === type) { return true; }
        proto = proto.__proto__;
    }
    return false;
}

let a = [];
console.log(instanceof1(a, Array)); // true