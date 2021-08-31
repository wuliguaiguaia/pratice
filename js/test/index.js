let o = {
  number: 1,
  valueOf() {
    return this.number++
  }
}
console.log(o == 1); // true
console.log(o == 2); // true
 