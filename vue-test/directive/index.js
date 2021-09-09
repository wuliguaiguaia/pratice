
// https://cn.vuejs.org/v2/guide/custom-directive.html
new Vue({
  template: '<h1>sdfsd</h1>'
}).$mount('#app')

// 全局自定义指令，防止按钮多次点击连续触发请求
Vue.directive('limit-click', {
  // 当被绑定的元素插入到 DOM 中时
  inserted(el, bind) {
    let canHttp = true;
    el.addEventListener('click', () => {
      if (!canHttp) return;
      canHttp = false;
      bind.value().then(res => {
        setTimeout(() => { // 加定时器是为了防止数据改变到视图改变期间误操作
          canHttp = true;
        }, 500);
      });
    });
  }
});
