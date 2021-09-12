console.log('2s后，2');
setTimeout(() => {
  require.ensure('./moduleB').then(res => {
    console.log(res);
  })
}, 2000);
module.exports = '2s后，3'
