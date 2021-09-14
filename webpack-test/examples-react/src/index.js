import JsxDemo from './jsx-demo.jsx'
import TsxDemo from './test.tsx'

import "@/css/style.scss";
import "@/css/style.less";
import "@/css/style.styl";

import sassVars from './common/sass/sass-export.scss';
import lessVars from '@/common/less/var.less';
import styleVars from '@/common/stylus/var.styl';

import '@/js/common.js'
console.log(JsxDemo)

console.log(TsxDemo);


console.log('scss分享变量给js', sassVars)
console.log('less分享变量给js', lessVars)
console.log('stylus分享变量给js', styleVars)