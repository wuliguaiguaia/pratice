const fetch = async () => {
    return new Promise(resolve => {
        console.log(11)
        setTimeout(() => {
            resolve({
                data: 'ssss'
            })
        }, 3000)
    })
}

/**
 * 轮询函数
 * fetchData: 获取数据
 * checkSuccess: 检查是否成功
 * retry：可重试次数，0 表示不限制
 * timeout：超时时间，0 表示不限制
 * reduceTime：请求降频，每次请求后隔一会再发起
 */
  const poll = async ({
    fetchData,
    checkSuccess,
    retryTimes = 0,
    timeout = 0,
    reduceTime = 0,
}) => {
    let count = 0;
    const startTime = Date.now();
    while ((retryTimes > 0 && count++ < retryTimes + 1) || (timeout > 0 && Date.now() - startTime < timeout)) {
        const data = await fetchData();
        if (checkSuccess(data)) {
            return Promise.resolve({ type: 'EPollResultType.Success', data });
        }
        console.log('count', count);
        if (retryTimes > 0 && count > retryTimes) {
            return Promise.resolve({ type: 'EPollResultType.ExceedRetryLimit' }); // 超过次数限制
        }
        if (timeout > 0 && Date.now() - startTime >= timeout) {
            return Promise.resolve({ type:' EPollResultType.ExceedTimeLimit' }); // 超过时间限制
        }
        await new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, reduceTime);
        });
    }
};
  
  // 调用轮询函数，限制重试次数
  /* poll({ retry: 5})
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    }); */
  
  // 调用轮询函数，限制超时时间
  /* poll({ timeout: 10000, reduceTime: 0 })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    }); */
  
  // 调用轮询函数，同时限制重试次数和超时时间
  poll({ fetchData: fetch, checkSuccess:(data) => {
    return data.data === 'ssss0'
  }, 
  timeout: 2000,
//   retryTimes: 3
 })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });