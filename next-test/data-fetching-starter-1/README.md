This is a starter template for [Learn Next.js](https://nextjs.org/learn).


.next/static 包含webpack打包生成的所有静态资源，包括公共js，css以及每个页面私有的js，css
.next/server/pages 中保存已生成的页面以及与该页面所需的json数据
.next/build-manifest.json 可以看到每个页面所关联的js和css

每个页面与该页面所需的最少js相关联

SSG 类型页面在 npm run build 是就会执行 getStaticProps 拉取数据生成 html 与对应 json，之后用户请求的永远都是这一份html

如果是SSG动态路由页面(users/[id].js)，包含了 getStaticPaths,那么在 build时也会同时生成 getStaticPaths 指定路径的页面及其json，去请求 /users 列表时会预加载列表包含所有id的json，再去切换到 /users/1 或 /users/2 类似单页应用动态修改数据，不会重新请求

如果 SSG动态路由页面里 getStaticPaths 使用fallback：true，那么 .next/server/pages 会新增一个 [id].html，页面为 router.isfallback 的返回内容，即备用页面

此时请求用户列表 /users，获取页面 link 标签，发现除了id为1和2的链接，还有3，会立即在后台生成 3.html 和 3.json，再去请求 /users/3 会发现返回的是完整的html。但如果你在build后立即请求 /users/3 会发现先请求到一个备用页面 [id.html]，再去请求 3.json

按上个步骤，你请求了 /users/3（此页面包含 link 指向 /users）,你会发现该页面后续又请求了 users.json，说明 **next会读取页面link标签，进行页面的预加载**

** `.next/server/pages` 作为页面缓存池，静态生成的页面和数据都保存在这里，ISR 更新的也是这里的html **




