/* eslint-disable */

const performance = window.performance
const timing = performance.timing

class PerformanceReoporter {
  /*  上报地址 */
  reportUrl = 'www.xxx.com/log/xxx.gif'

  /* 公共参数 */
  publicParamters = {}

  /* 性能参数 */
  performanceData = {}

  /* 业务打点标签？？ */
  performanceTag = {}

  /* reporter key name */
  TAG_WHITE_LIST = []

  /* 临时 timing 记录 */
  timingRecord = {}

  /* 性能打点公共字段，区分与其他打点 */
  name = 'performance'

  constructor() {
    this.init()
  }

  /* 上报默认加载性能数据，不需要手动触发 */
  init() {
    this.bindOnloadEvent()

  }

  bindOnloadEvent() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.sendPerformanceData()
      }, 0);
    })
  }

  sendPerformanceData() {
    const publicParamters = this.getPublicParameters()
    const performanceData = this.getPerformanceData()
    this.send({ publicParamters, data: performanceData })
  }

  getPublicParameters() {
    this.publicParamters = {}
    const t = Date.now()
    const host = window.location.host
    const userAgent = navigator.userAgent
    this.publicParamters = {
      t,
      host,
      userAgent
    }
    return this.publicParamters
  }

  getPerformanceData() {
    this.performanceData = {
      dns: timing.domainLookupEnd - timing.domainLookupStart,
      tcp: timing.connectEnd - timing.connectStart,
      request: timing.responseEnd - timing.requestStart,
      dom: timing.domInteractive - timing.domLoading, // DOM 解析
      screen: timing.responseEnd - timing.navigationStart, // 白屏时间
      ready: timing.domContentLoadedEventEnd - timing.navigationStart, // DOM 准备就绪
      load: timing.loadEventStart - timing.navigationStart, // 页面完全加载
      name: this.name
    }
    return this.performanceData
  }

  send(data, callback) {
    const img = new Image()
    img.src = this.reportUrl
    img.onload = () => {
      img = null
      typeof callback === 'function'
    }
  }

  install(Vue) {

  }
}

export default PerformanceReoporter
