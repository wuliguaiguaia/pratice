'use strict';

require.ensure('./moduleA.js').then(res => {
    const { a, foo } = res;
    console.log(1, res.a);
    res.foo();
    console.log(2, res.a);
});