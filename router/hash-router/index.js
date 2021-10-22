/* 实现 */
class BaseRouter {
  constructor() {
    this.routes = {}
    this.refresh = this.refresh.bind(this)
    window.addEventListener('load', this.refresh) // 处理页面首次加载
    window.addEventListener('hashchange', this.refresh) // 处理页面
  }
  addRouter(path, cb) { // 实例化存储变化回调
    this.routes[path] = cb
  }
  refresh() { // hash 变化执行回调
    const hash = location.hash?.slice(1) || ''
    console.log(hash);
    this.routes[hash]()
  }
}

/* 使用 */
const route = new BaseRouter()
route.addRouter('', changeBgColor.bind(undefined, 'pink'))
route.addRouter('red', changeBgColor.bind(undefined, 'red'))
route.addRouter('yellow', changeBgColor.bind(undefined, 'yellow'))
route.addRouter('green', changeBgColor.bind(undefined, 'green'))

function changeBgColor(color) {
  document.body.style.background = color
}