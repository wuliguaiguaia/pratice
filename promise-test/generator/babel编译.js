/* 原 */
async function foo() {
  let response1 = await fetch('id.txt')
  console.log(response1)
  let response2 = await fetch('article.txt')
  console.log(response2)
}

/* 编译后 */
"use strict";

require("regenerator-runtime/runtime.js");

require("core-js/modules/es.promise.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function foo() {
  return _foo.apply(this, arguments);
}

function _foo() {
  _foo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var response1, response2;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch('id.txt');

          case 2:
            response1 = _context.sent;
            console.log(response1);
            _context.next = 6;
            return fetch('article.txt');

          case 6:
            response2 = _context.sent;
            console.log(response2);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _foo.apply(this, arguments);
}

/* 测试编译：
https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=usage&corejs=3.6&spec=true&loose=true&code_lz=IYZwngdgxgBAZgV2gFwJYHsL3emAKAShgG8AoGGAGwFNkYAnakAB0xGoEYYBeGYAd2Co6cWlAAWeAOSoAJgDpkAD2RSC5GFDboa8yugDmeRizad1FGnROsI7AEw8-g4fDGSpwemii7lqog0tOx1qPUNjJlsHdQBfIA&debug=false&forceAllTransforms=true&shippedProposals=true&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Cstage-0%2Cstage-1%2Cstage-2%2Cstage-3&prettier=false&targets=Electron-1.8%252CNode-10.13&version=7.15.3&externalPlugins=&assumptions=%7B%7D
 */