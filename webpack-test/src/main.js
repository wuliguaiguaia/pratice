// import _ from 'lodash';
import a from './print.js';

document.body.innerHTML = a.a1;

console.log(a);
if (module.hot) {
  module.hot.accept('./print.js', function (data) {
    console.log('Accepting the updated printMe module!');
    console.log(data);
    console.log(a);
  })
}