const dayjs = require('dayjs')
console.log(dayjs());

// 取/赋值，传则赋值，不传则返回
console.log('-----getter/setter start-----');
console.log(dayjs().millisecond()); // gets current millisecond
console.log(dayjs().millisecond(1000)); // gets current millisecond
console.log(dayjs().get('M')); // 月份默认从0开始

console.log('-----operate start-----');
console.log(dayjs().add(7, 'day'));
console.log(dayjs().subtract(7, 'day').get('date')); // 减去一定时间
console.log(dayjs().startOf('year').get('date')); // 以年开始
console.log(dayjs().endOf('year').get('M')); // 以月结尾

console.log('-----format start-----');
console.log(dayjs('2019-01-25').diff('2018-06-05', 'month')); // 7
console.log(dayjs('2019-01-25').diff('2018-06-05', 'month', true)); // 7.645161290322581

console.log('-----search start-----');

console.log('-----duration start-----');
var durationPlugin = require('dayjs/plugin/duration')
dayjs.extend(durationPlugin)
/* duration 
console.log(dayjs.duration(100))
console.log(dayjs.duration(2, 'days'));
console.log(dayjs.duration({
    seconds: 1,
    minutes: 2,
    hours: 3,
    days: 4,
    months: 6,
    years: 7
  }).format('YYYY-MM-DDTHH:mm:ss'));

console.log(dayjs.duration(15000).milliseconds()); // 0
console.log(dayjs.duration(15000).asMilliseconds()); // 15000

console.log(dayjs.duration(500).seconds()); // 0
console.log(dayjs.duration(500).asSeconds()); // 0.5

console.log(dayjs.duration(100000).weeks());
console.log(dayjs.duration(100000).asWeeks());

// 作为 Duration#asX 的替代
console.log(dayjs.duration(1000).as('hours'));        // 1/60/60
console.log(dayjs.duration(1000).as('minutes'));      // 1/60
console.log(dayjs.duration(1000).as('seconds'));      // 1
console.log(dayjs.duration(1000).as('milliseconds')); // 1000

// 是否是 Duration 对象
console.log(dayjs.isDuration()) // false
console.log(dayjs.isDuration(new Date())) // false
console.log(dayjs.isDuration(dayjs())) // false
console.log(dayjs.isDuration(dayjs.duration())) // true
console.log(dayjs.isDuration(dayjs.duration(2, 'minutes'))) // true

*/

console.log('---- 实战 start----');
console.log(dayjs.duration(dayjs('2023-5-30').diff(dayjs())));