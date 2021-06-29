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
eventEmitter.off('start', listener);
eventEmitter.emit('start', 1, 2)
eventEmitter.removeAllListeners('start');
eventEmitter.emit('start', 1, 2)