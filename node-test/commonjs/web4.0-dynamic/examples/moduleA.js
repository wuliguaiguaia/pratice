console.log('2');
require.ensure('./moduleB').then(res => {
    console.log('5', res);
    require('./moduleC');
});
module.exports = '3';
