
const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
const sss = Object.getOwnPropertyNames(Symbol)
  .map(key => {
    let t = (Symbol as any)[key];
    // console.log(key, t);
    return t;
  })
  .filter(isSymbol)

console.log(sss);
// (13)[Symbol(Symbol.asyncIterator), Symbol(Symbol.hasInstance), Symbol(Symbol.isConcatSpreadable), Symbol(Symbol.iterator),
// Symbol(Symbol.match), Symbol(Symbol.matchAll), Symbol(Symbol.replace), Symbol(Symbol.search), Symbol(Symbol.species), Symbol(Symbol.split), 
// Symbol(Symbol.toPrimitive), Symbol(Symbol.toStringTag), Symbol(Symbol.unscopables)]

