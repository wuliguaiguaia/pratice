/* eslint-disable */

const Utils = {
  object2String(data) {
    return Object.keys(data).reduce((res, key) => {
      res += `&${key}=${data[key]}`
      return res
    }, '')
  }
}

const performance = window.performance
const timing = performance.timing
class PerformanceReoporter {
  /*  上报地址 */
  reportUrl = 'www.xxx.com/log/xxx.gif'

  /* 公共参数 */
  publicParameters = {}

  /* 性能参数 */
  performanceData = {}

  /* 业务打点标签 */
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
    this.setPerformanceTagWhiteList()
  }

  bindOnloadEvent() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.sendPerformanceData()
      }, 0);
    })
  }

  sendPerformanceData() {
    const publicParameters = this.getPublicParameters()
    const performanceData = this.getPerformanceData()
    this.send({ publicParameters, data: performanceData })
  }

  getPublicParameters() {
    this.publicParameters = {}
    const t = Date.now()
    const host = window.location.host
    const userAgent = navigator.userAgent
    this.publicParameters = {
      t,
      host,
      userAgent
    }
    return this.publicParameters
  }

  getPerformanceData() {
    this.performanceData = {
      dns: timing.domainLookupEnd - timing.domainLookupStart,
      tcp: timing.connectEnd - timing.connectStart,
      request: timing.responseEnd - timing.requestStart,
      dom: timing.domInteractive - timing.domLoading, // DOM 解析
      screen: timing.responseEnd - timing.navigationStart, // 白屏时间
      ready: timing.domContentLoadedEventEnd - timing.fetchStart, // DOM树 准备就绪
      load: timing.loadEventStart - timing.fetchStart, // 页面完全加载
      name: this.name
    }
    return this.performanceData
  }

  /* 标记白名单，命中就不走 mark 逻辑 */
  setPerformanceTagWhiteList() {
    const list = []
    for (const key in timing) {
      list.push(key)
    }
    this.TAG_WHITE_LIST = list
  }

  send({ publicParameters, data }, callback) {
    debugger
    const queryString = Utils.object2String(data)
    const publicParametersString = Utils.object2String(publicParameters)
    const paramsString = `?publicParameters=${encodeURIComponent(publicParametersString)}${queryString}`
    let img = new Image()
    img.src = this.reportUrl + paramsString
    img.onload = () => {
      img = null
      /* 执行回调 */
      typeof callback === 'function' && callback()
    }
  }

  install(Vue) {
    Vue.prototype.$addPerformanceTag = this.addPerformanceTag.bind(this)
    Vue.prototype.$performanceReporter = this.sendLogicPerformanceData.bind(this)
    Vue.prototype.$normalReporter = this.sendNormalData.bind(this)
  }

  /* 发送得性能数据 */
  sendNormalData(data) {
    debugger
    console.log(data,'lll');
    const publicParameters = this.getPublicParameters();
    const url = encodeURIComponent(window.location.href);
    const query = encodeURIComponent(window.location.search);
    const hash = encodeURIComponent(window.location.hash);
    data = {
      ...data,
      name: this.name,
      url,
      query,
      hash
    };
    console.log(data, '00');
    this.send({ publicParameters, data });
  }

  /* 添加业务性能标签 */
  addPerformanceTag(name, tag) {
    const tagString = `${name}-${tag}`
    if (!this.performanceTag[name]) {
      this.performanceTag[name] = []
    }
    this.performanceTag[name].push(tagString)
    this.setPerformanceTag(name, tag)
  }

  /* 设置 tag 到 performance */
  setPerformanceTag(name, tag) {
    const tagString = `${name}-${tag}`
    const isTagInWhiteList = this.TAG_WHITE_LIST.includes(tag)
    let record = this.timingRecord[name]
    if (isTagInWhiteList) {
      record = {
        start: timing[tag],
        end: +new Date()
      }
      this.timingRecord[name] = record
    } else {
      performance.mark(tagString)
    }
  }

  /* 发送业务逻辑打点数据 */
  sendLogicPerformanceData(tag, otherData) {
    const data = this.getLogicPerformanceData(tag, otherData)
    const publicParameters = this.getPublicParameters()
    if (!data) return
    console.log('业务打点', data);
    this.send({publicParameters, data})
  }

  getLogicPerformanceData(tagName, otherData = {}) {
    let data = {}
    const url = encodeURIComponent(window.location.href)
    const query = encodeURIComponent(window.location.search)
    const hash = encodeURIComponent(window.location.hash)

    if (tagName && this.performanceTag[tagName]) {
      const tag = this.performanceTag[tagName]
      const start = tag[0]
      const end = tag[tag.length - 1]
      const result = this.getPerformanceTagDuration(tag, start, end)
      if (!result) return null

      // 单条上报数据进行分类，方便报表查询
      const requestReg = /^get/ig
      const renderReg = /Render$/ig
      const loadReg = /Load$/ig
      const clickReg = /Click$/ig

      data.type = "other"
      if (requestReg.test(tagName)) data.type = 'request'
      if (renderReg.test(tagName)) data.type = 'render'
      if (loadReg.test(tagName)) data.type = 'load'
      if (clickReg.test(tagName)) data.type = 'click'
      data.sign = tagName
      data[tagName] = result
      data.cosTime = result
    } else {
      // 上报当前
      for (const key of Object.keys(this.performanceTag)) {
        const tag = this.performanceTag[key]
        const start = tag[0]
        const end = tag[tag.length - 1]
        const result = this.getPerformanceTagDuration(key, start, end)
        data[key] = result
      }
    }
    this.clearPerformanceMarks(data)

    data = {
      ...data,
      ...otherData,
      name: this.name,
      url,
      query,
      hash
    }
    return data
  }

  clearPerformanceMarks(data) {
    for (const key in data) {
      if (data[key]) {
        performance.clearMarks(key) // start end
        performance.clearMeasures(key)
        delete this.performanceTag[key]
      }
    }
  }

  getPerformanceTagDuration(tag, start, end) {
    let duration;
    if (this.timingRecord[tag]) {
      duration = this.getTimingRecordDuration(tag, start, end)
    } else {
      duration = this.getPerformanceDuration(tag, start, end)
    }
    return duration
  }

  getTimingRecordDuration(tag, start, end) {
    const record = this.timingRecord[tag]
    return record && record.start && record.end ? record.end - record.start : 0
  }

  getPerformanceDuration(tag, start, end) {
    performance.measure(tag, start, end)
    console.log(performance.getEntriesByName(tag));
    return +performance.getEntriesByName(tag)[0].duration.toFixed(2)
  }
}

export default PerformanceReoporter
