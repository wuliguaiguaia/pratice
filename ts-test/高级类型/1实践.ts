
// 获取各种对象类型：https://blog.csdn.net/wu_xianqiang/article/details/128519603

// 1、获取一个常量的所有key，value 联合类型
const RestfulMethod = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE'
} as const
type IRestfulMethod = typeof RestfulMethod
type IRestfulKey = keyof IRestfulMethod; // "get" | "post" | "put" | "delete"
type TypeRestfulMethod = IRestfulMethod[IRestfulKey] // "GET" | "POST" | "PUT" | "DELETE"


// 2、获取一个enum的key和value联合类型
enum EPageId {
  Theatre = 'theatre',
  SubscribedVideo = 'subscribed-video',
  News = 'news',
  Mine = 'mine',
  Video = 'video',
  AboutUs = 'about-us',
  UserRecord = 'user-record',
  Webview = 'webview',
}
type TPageId = keyof typeof EPageId; // "Theatre" | "SubscribedVideo" | "News" | "Mine" | "Video" | "AboutUs" | "UserRecord" | "Webview"
type IPageIdValue = `${EPageId}`  // 'all' | 'some' | 'little'

// 2、枚举值转换为一个常量数组
enum EVideoOfflineStatus {
  Online, // 未下架
  Full, // 整剧下架
  Episode, // 单集下架
}

const statusValues = Object.values(EVideoOfflineStatus);

// 使用示例
console.log(statusValues); // 输出: [0, 1, 2]

// 3、获取方法名集合
let obj = {
    name: 'hello',
    age: 18, 
    eat () {
      return 'food'
    },
    link () {
      return 'dog'
    }
}

type methodsPick<T> = {[K in keyof T]: T[K] extends Function ? K : never}[keyof T];
type T1 = methodsPick<typeof obj> // 'eat' | 'link'

