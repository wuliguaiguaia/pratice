// noImplicitAny": true, // 不能写any
const qa = (a, b) => {
    console.log(2);
};

qa(1, 2);

// 看报错的对象
// 1、 使用泛型
// 2、使用断言