function create(obj) {
    function F() { }
    F.prototype = obj;
    return new F();
}

let g = {a: 1};
const f = create(g);
console.log(f.__proto__ === g); // true