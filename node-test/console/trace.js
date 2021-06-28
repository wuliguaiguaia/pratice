const function2 = () => console.trace()
const function1 = () => function2()
function1()

/**
 * Trace
    at function2 (/Users/alias/code/pratice/node-test/console/trace.js:1:33)
    at function1 (/Users/alias/code/pratice/node-test/console/trace.js:2:25)
    at Object.<anonymous> (/Users/alias/code/pratice/node-test/console/trace.js:3:1)
    at Module._compile (node:internal/modules/cjs/loader:1109:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1138:10)
    at Module.load (node:internal/modules/cjs/loader:989:32)
    at Function.Module._load (node:internal/modules/cjs/loader:829:14)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:76:12)
    at node:internal/main/run_main_module:17:47
 */