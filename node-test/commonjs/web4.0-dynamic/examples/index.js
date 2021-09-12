console.log('1');
setTimeout(() => {
  require.ensure('./moduleA').then(res => {
    console.log(res);
  })
}, 2000);