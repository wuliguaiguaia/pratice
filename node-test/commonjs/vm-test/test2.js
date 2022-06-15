const vm = require('vm');

globalVar = 13; // 全局的

vm.runInThisContext('globalVar *= 2;console.log("====")');

console.log(globalVar);

var aaa = 11;// 本地

vm.runInThisContext('aaa *= 2');

console.log(aaa);


/* ====
26
evalmachine.<anonymous>:1
aaa *= 2
^

ReferenceError: aaa is not defined */