import { a, foo } from './a.js';

console.log(a);

foo();

console.log(a);

// ./node_modules/.bin/babel src --out-dir dist

import './b.js'