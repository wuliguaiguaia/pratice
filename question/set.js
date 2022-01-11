//实现一个集合，增、删、是否存在、交集功能



// getHotPot('火锅', function (data1) {
//   params = printFood(data1)
//   if (data1) {
//     getBubbleTea(params, function (response) {
//       if (response.errNo !== 0) {
//         printFood(data2)
//         getFiredChicken(function (data3) {
//           if (data3) {
//             printFood(data)
//             getFiredChicken(function (data4) {
//               if (data4) {
//                 getFiredChicken(function (data5) {
//                   if (data5) {
                    
//                   }
//                 })
//               } else {
//                 /* data4 一些处理 */
//               }
//             })
//           } else {
//             /* data3 一些处理 */
//           }
//         })
//       } else {
//         /* data2 一些处理 */
//       }
//     })
//   } else {
//     /* data1 一些处理 */
//   }
// })

function getResult(error, value) {
  if (error !== null) {
    console.log("捕获错误: " + String(error));
    return;
  }
  console.log(`结果: ${value}`);
}
function runWithOrder(param, callback) {
  setTimeout(() => {
    if (typeof param !== "number") {
      callback(new Error(`参数${param}应为数字`))
      return
    }
    callback(param)
  }, 1000)
}
runWithOrder('1', (error, callback) => {
  if (error) {
    console.log(error, 'caught')
    return
  } else {
    runWithOrder(2, () => {
      runWithOrder(3, () => {
        runWithOrder(4, () => {
          runWithOrder(5, () => {
            runWithOrder('6', getResult)
          })
        })
      })
    })
  }
})


/* runWithOrder(1, (data) => {
  getResult(data)
  runWithOrder(2, (data) => {
    getResult(data)
  })
}) */