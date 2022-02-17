This is a starter template for [Learn Next.js](https://nextjs.org/learn).


####  html + json

next 为每个页面静态生成了html和json，无论是SSG和SSR 

html 如：
```
<html>
    <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width"/>
        <meta name="next-head-count" content="2"/>
        <link rel="preload" href="/_next/static/css/a2265cb7a0c708a7.css" as="style"/>
        <link rel="stylesheet" href="/_next/static/css/a2265cb7a0c708a7.css" data-n-g=""/>
        <noscript data-n-css=""></noscript>
        <!-- polyfillFiles -->
        <script defer="" nomodule="" src="/_next/static/chunks/polyfills-5cd94c89d3acac5f.js"></script>
        <!--   -->
        <script src="/_next/static/chunks/webpack-69bfa6990bb9e155.js" defer=""></script>
        <script src="/_next/static/chunks/framework-6e4ba497ae0c8a3f.js" defer=""></script>
        <script src="/_next/static/chunks/main-83803dd478f5b5bc.js" defer=""></script>
        <script src="/_next/static/chunks/pages/_app-73483fad2904193b.js" defer=""></script>
        <!-- 该页面所需 js -->
        <script src="/_next/static/chunks/pages/users/%5Bid%5D-dc83b756f9b806d1.js" defer=""></script>
        <!-- lowPriorityFiles -->
        <script src="/_next/static/NVp1g76ArQSS85zjw1gWB/_buildManifest.js" defer=""></script>
        <script src="/_next/static/NVp1g76ArQSS85zjw1gWB/_ssgManifest.js" defer=""></script>
        <script src="/_next/static/NVp1g76ArQSS85zjw1gWB/_middlewareManifest.js" defer=""></script>
    </head>
    <body>
        <!-- 预渲染出的页面内容 -->
        <div id="__next" data-reactroot="">
            <div>
                alias<br/>
                1000000000<br/>
                <a href="/users">返回</a>
            </div>
        </div>
        <!-- 当前页面组件接收到的 props 等 -->
        <script id="__NEXT_DATA__" type="application/json">
            {"props":{"pageProps":{"user":{"id":1,"username":"alias","account":1000000000,"time":1645094925711}},"__N_SSG":true},"page":"/users/[id]","query":{"id":"1"},"buildId":"NVp1g76ArQSS85zjw1gWB","isFallback":false,"gsp":true,"scriptLoader":[]}
        </script>
    </body>
</html>
```

对应到 .next 文件夹:
1. .next/static 包含webpack打包生成的所有静态资源，包括公共js，css以及每个页面私有的js，css
2. .next/build-manifest.json 可以看到每个页面所关联的js和css，next打包拆分使得每个页面与该页面所需的最少js相关联


json 如
```json
{
  "pageProps": {
    "user": {
      "id": 1,
      "username": "alias",
      "account": 1000000000,
      "time": 1645094925711
    }
  },
  "__N_SSG": true
}
```
当前页面组件显示所需的props数据，由getServerSideProps/getStaticProps返回，切换页面时拿到该json进行页面内容的动态替换


#### SSG

假设有一个使用了 getStaticProps 用户列表页 /users 和一个使用了 getStaticPaths + getStaticProps 的用户详情页 /users/[id].js，如 #动态路由示例

会发现 SSG 类型页面(/users)在 npm run build 是就会执行 getStaticProps 拉取数据生成 html(.next/server/pages/users.html) 与对应 json (.next/server/pages/users.json)，之后用户请求的永远都是这一份html

如果是SSG动态路由页面(users/[id].js)，那么在 build 时也会同时生成 getStaticPaths 指定路径的页面及其json，(.next/server/pages/1.html、1.json、2.html、2.json...)

如果SSG动态路由页面里 getStaticPaths 使用fallback：true，那么 .next/server/pages 会新增一个 [id].html，内容为[id.js] 里router.isfallback 的返回，这个就是前面所说的备用页面，请求未生成的页面返回的都会先返回这个页面，再在后台执行 getStaticProps 返回 x.json 替换页面内容。

#### 预加载

打包后立即请求 /users, 会发现在后台接连请求了 1.json 和 2.json，此时访问id为1的用户，不会再请求 1.json 而是立即进行内容的替换。 **next会读取页面link标签，进行页面的预加载**

如果/users页增加一个id是3的用户，getStaticPaths 依旧只返回id为1和2的路径，并且使用了 fallback:ture,，那么此时 build 依然不会有 3.html, 3.json，此时请求 /users 会发现多出了 3.json, 且在.next/server/pages/users 新增 3.html, 3.json ，此后访问 /users/3 返回的都是完整的页面内容，因为预加载已经生成了html
  
此时修改用户列表页，增加 revalidate: 10,则会发现 10s 再次请求已生成的 users.html 被修改了

以上说明 **`.next/server/pages` 作为页面缓存池，静态生成的页面和数据都保存在这里，包含 ISR 更新后的页面**

再看 SSR 类型，假设有一页面路径为 /test-ssr
```js
export async function getServerSideProps() {
  const time = Date.now()
  while (Date.now() - time < 3000) {} /* 假设获取数据需要3s */
  const { username, account } = getData()
  return {
    props: {
      username,
      account,
      time: Date.now()
    },
  }
}
```
会发现两个现象：
1. npm run build 在构建时没有生成 .next/server/pages/test-ssr.html
2. 浏览器请求时3s内挂起，3s后返回带有内容的完整页面.

说明浏览器请求时next在后台执行 getServerSideProps，拿到数据后将拼凑好的 html 返回给浏览器。

此时已生成的 SSR html 也不会存储在 .next/server/pages，每次请求都会重新生成，所以需要实时数据的页面可以用 getServerSideProps

