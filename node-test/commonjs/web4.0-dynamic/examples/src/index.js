require.ensure('./moduleA.js').then((res => {
    require('./moduleB.js');
    res.foo();
    console.log(res.a);
}));
