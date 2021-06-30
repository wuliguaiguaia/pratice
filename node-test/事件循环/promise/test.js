
const t2 = (res) => {
  console.log('2---');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('t2');
      resolve(res + 1)
    }, 2000);
  })
}

const t3 = (res) => {
  console.log('3---');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('t3');
      resolve(res + 1)
    }, 2000);
  })
}

new Promise((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, 1000);
  })
  .then(t2)
  .then(t3)
  .then((data) => {
    console.log('data:',data);
  })


// 2---
// t2
// 3---
// t3
// data: 3