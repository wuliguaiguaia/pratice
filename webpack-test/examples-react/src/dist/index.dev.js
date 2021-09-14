"use strict";

var _jsxDemo = _interopRequireDefault(require("./jsx-demo.jsx"));

var _test = _interopRequireDefault(require("./test.tsx"));

require("@/css/style.scss");

require("@/css/style.less");

require("@/css/style.styl");

var _sassExport = _interopRequireDefault(require("./common/sass/sass-export.scss"));

var _var = _interopRequireDefault(require("@/common/less/var.less"));

var _var2 = _interopRequireDefault(require("@/common/stylus/var.styl"));

require("@/js/common.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

console.log(_jsxDemo.default);
console.log(_test.default);
Promise.resolve().then(function () {
  return _interopRequireWildcard(require('@/js/async.js'));
});
console.log('scss分享变量给js', _sassExport.default);
console.log('less分享变量给js', _var.default);
console.log('stylus分享变量给js', _var2.default);