/* 实现 */
class BaseRouter {
  constructor() {
    this.routes = {}
    this.init(location.pathname === '/index.html' || '/' ? 'red' : location.pathname)
    this._bindPopState()
  }
  init(path) {
    console.log(path);
    window.history.replaceState({ path }, null, path)
    
    this.routes[path]?.() // 执行不了，一般在new的时候传入配置，这里就哟了。。
  }
  addRouter(path, cb) { // 实例化存储变化回调
    this.routes[path] = cb
  }
  go(path) {
    window.history.pushState({path}, null, path)
    this.routes[path]?.()
  }
  _bindPopState() {
    window.addEventListener('popstate', (e) => {
      // e.state 只有当 replaceState 或 pushState的第一个参数有内容
      let { state = {} } = e
      if (state.path) {
        this.routes[state.path]?.()
      }
    })
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

const container = document.querySelector('.container')
container.addEventListener('click', e => {
  e.preventDefault()
  const target = e.target
  if(target.tagName === 'A') {
    route.go(target.getAttribute('href').slice(1))
  }
})

/* 问题： */
/* 页面刷新问题, 需要后端配合 */