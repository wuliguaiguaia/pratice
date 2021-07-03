const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

const listener = ($1, $2) => {
  console.log($1, '===', $2);
};
const listener2 = ($1, $2) => {
  console.log($1, '---','===', $2);
};

eventEmitter.on('start', listener)
eventEmitter.on('start', listener2)


eventEmitter.emit('start', 1, 2)
// eventEmitter.off('start', listener);
eventEmitter.emit('start', 1, 2)

/* 移除监听器 传参则表示该类型 */
// eventEmitter.removeAllListeners('start');

eventEmitter.on('event2', () => {
  console.log('1');
});


/* 返回事件名数组 */
console.log('eventNames', eventEmitter.eventNames()); // [ 'start', 'event2' ]

/* 获取可以添加到 EventEmitter 对象的监听器的最大数量 */
console.log('getMaxListeners', eventEmitter.getMaxListeners()); // 10

// 测试
eventEmitter.on('event2', () => {
  console.log('2');
});
eventEmitter.on('event2', () => {
  console.log('3');
});
eventEmitter.on('event2', () => {
  console.log('4');
});
eventEmitter.on('event2', () => {
  console.log('5');
});
eventEmitter.on('event2', () => {
  console.log('6');
});
eventEmitter.on('event2', () => {
  console.log('7');
});
eventEmitter.on('event2', () => {
  console.log('8');
});
eventEmitter.on('event2', () => {
  console.log('9');
});
eventEmitter.on('event2', () => {
  console.log('10');
});

/* 
  MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 event2 listeners added to [EventEmitter].
  可通过 emitter.setMaxListeners() 修改限制
eventEmitter.on('event2', () => {
  console.log('11');
});
*/

/* 获取作为参数传入的事件监听器的计数 */
console.log(eventEmitter.listenerCount('event2')); // 10
console.log(eventEmitter.listenerCount('start')); // 2

/* 获取作为参数传入的事件监听器的数组： */
console.log(eventEmitter.listeners('start')); // [ [Function: listener], [Function: listener2] ]

/* 提前调用 */
eventEmitter.prependListener('start', () => {
  console.log('prependListener');
})
