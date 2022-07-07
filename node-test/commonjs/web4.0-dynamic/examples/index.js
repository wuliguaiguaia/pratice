console.log('1');
require.ensure('./moduleA').then(res => {
    console.log('3', res);
});