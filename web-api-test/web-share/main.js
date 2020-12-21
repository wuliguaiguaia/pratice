/**
 * https://wangdoc.com/webapi/web-share-api.html
 * 允许网页调用操作系统的分享接口
 * 必须启用 HTTPS 协议
 */

button.onclick = () => {
  if (navigator.share) {
    // 支持
    console.log(1); // 幸好 Safari 支持，差点测个寂寞
    navigator.share({
      title: 'WebShare API Demo',
      url: 'https://codepen.io/ayoisaiah/pen/YbNazJ',
      text: '我正在看《Web Share API》'
    }).then(res => {
      console.log('ffff');
    }).catch(err => {
      console.log(err);
    })
  } else {
    // 不支持
    console.log(2); // 喵的，chrome  firefox 都测不了，用个鬼啊
  
  }
  
  if (navigator.canShare) {
    console.log(11);
  } else {
    console.log(22); // 没有一个支持
  }
}

// button2.onclick = () => {
//   if (navigator.canShare && navigator.canShare({ files: filesArray })) {
//     navigator.share({
//       files: filesArray,
//       title: 'Vacation Pictures',
//       text: 'Photos from September 27 to October 14.',
//     })
//       .then(() => console.log('Share was successful.'))
//       .catch((error) => console.log('Sharing failed', error));
//   } else {
//     // 不支持
//     console.log(2);
  
//   }
// }