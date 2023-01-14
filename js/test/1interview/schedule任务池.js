
class Scheduler {
  queue = []
  cur = 0
  constructor(max) {
    this.max = max
  }
  add(promiseCreator) {
    let promise = new Promise(resolve => {
      promiseCreator.resolve = resolve
    })
    this.queue.push(promiseCreator)
    let that = this
    function execute() {
      if (that.queue.length === 0) return
      if (that.cur < that.max) {
        that.cur++
        const task = that.queue.shift()
        task().then(function () {
          task.resolve()
          that.cur--
          execute()
        })
      }
    }
    execute()
    return promise
  }
}

const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const scheduler = new Scheduler(2)
const addTask = (time, order) => {
  scheduler.add(() => timeout(time))
    .then(() => console.log(order))
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
// output: 2 3 1 4

// 一开始，1、2两个任务进入队列
// 500ms时，2完成，输出2，任务3进队
// 800ms时，3完成，输出3，任务4进队
// 1000ms时，1完成，输出1
// 1200ms时，4完成，输出4
