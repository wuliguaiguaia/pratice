(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}((function () { 'use strict';

	// module.exports = 'tstestest'

	var d = 'sdfsdfsdfs';

	var test = /*#__PURE__*/Object.freeze({
		__proto__: null,
		'default': d
	});

	// const c = require('./test')
	console.log(d);

	Promise.resolve().then(function () { return test; });

})));
