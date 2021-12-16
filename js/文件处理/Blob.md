图片压缩\
文件上传\
大文件断点续传\
文件下载\

# Blob、File、DataURL(Base64)和BlobURL之间的闭环关系

Blob --> File
File --> DataURL（base64）
File --> BlobURL
HTTPURL| DataURL | BlobURL --> Blob

## Blob 类型是 File 文件类型的父类，它表示一个不可变、原始数据的类文件对象

1. new Blob(array, options)

let hiBlob = new Blob([`<h1>Hi!<h1>`], { type: 'text/html' })

创建了一个 blob 对象，并声明了 text/html 类型 ，就像是创建一个 .html 文件。只不过它存在于浏览器的内存里。

2. fetch(url, options)

Fetch API 提供了一个获取资源的统一接口（包括跨域请求）

①url 参数支持格式有：

- http、https
- blobURL: 比如通过 URL.createObjectURL() 获得
  如：blob:null/7025638d-c05f-4c75-87d6-470a427e9aa3

```js
  // 从接口获取文件进行下载
  let blob = res.data;
  let a = document.createElement('a');
  let url = URL.createObjectURL(blob);
  a.href = url;
  a.download = drawingImageId + suffix;
  a.click();
  window.URL.revokeObjectURL(url);
```

- dataURL: 如图片的 base64 格式，比如通过 canvasElement.toDataURL() 获得
  dataURL(base64) 黑色 1 像素示例：
  如: data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=

②fetch(url, options) 响应数据可被解析成：
res.arrayBuffer(): 通用、固定长度的原始二进制数据缓冲区
res.blob(): Blob 类型
res.formData(): 表单数据类型
res.json(): JSON 格式
res.text(): 文本格式

```js
// 获取图片的 blob 对象
fetch('http://eg.com/to/path/someImg.png')
  .then(res => res.blob())
  .then(blob => {
    console.log('blob: ', blob)
})
```

3. canvasElement.toBlob(callback)

canvas 具有图像操作能力，支持将一个已有的图片作为图片源，来操作图像。

```js
  // 获取图片资源
  function fetchImg (url) {
    return new Promise((resolve, reject) => {
      let img = new Image()
      // 跨域图片处理
      img.crossOrigin = 'anonymous'
      img.src = url
      // 图片资源加载完成回调
      img.onload = () => {
        resolve(img)
      }
    })
  }

  let canvas = $('canvas')
  let imgUrl = 'http://eg.com/to/path/someImg.png'
  let ctx = canvas.getContext('2d')
  let img = await fetchImg(imgUrl)
  // 向 canvas 画布上下文绘制图片
  ctx.drawImage(img, 0, 0)

  // 获取图片 blob 对象
  canvas.toBlob((blob) => {
    console.log('blob: ', blob)
  })

  // 获取图片 dataURL，也是 base64 格式
  let dataURL = canvas.toDataURL()
  console.log('dataURL: ', dataURL)
```

Tips:

1. 如果图片没加载完，就调用 drawImage，canvas 绘制将失败，所以我们简单封装了 fetchImg 方法，确保图片资源加载完成后再开始绘制图片。
2. 由于 canvas 中的图片可能来自一些第三方网站。【在不做处理的情况下，使用跨域的图片绘制时会污染画布】，这是出于安全考虑。在“被污染”的画布中【调用 toBlob() toDataURL() getImageData() 会抛出安全警告】。
解决方法：

```js
let img = new Image()
// 1. 增加 crossOrigin 属性，值为 anonymous
// 含义：执行一个跨域请求，在请求头里加 origin 字段
// 2. 后端要返回 Access-Control-Allow-Origin 响应头来允许跨域
img.crossOrigin = 'anonymous'
img.src = 'to/path'
```

本质就是解决跨域问题，也可以使用 nginx 做个代理来解决

3. blob 有 slice(startIndex, endIndex) 方法，复制 blob 对象某片段，与 js 数组的 slice 方法类似，文件的【断点续传功能】就是利用了该特性。

## File类型

File 包含文件的相关信息，可以通过 js 来访问其内容

见 ./index.html 描述

1. new File(bits, name[, options])

```js
// 1. 参数是字符串组成的数组
let hiFile = new File([`<h1>Hi gauseen!<h1>`], 'fileName', { type: 'text/html' })

// 2. blob 转 file 类型
let hiBlob = new Blob([`<h1>Hi gauseen!<h1>`], { type: 'text/html' })
let hiFile = new File([ hiBlob ], 'fileName', { type: 'text/html' })

// eg. 代码文本转文件
const res = {}
res.code = this.getCode()
res.blob = new Blob([res.code], {
  type: 'text/plain',
})
res.file = new File([res.blob], 'test.py', {
  type: 'text/plain',
})
return res
```

2. inputElement.files

```js
// input 上传文件时触发 change 事件
$('input').addEventListener('change', e => {
  let file = e.target.files[0]
  console.log('file: ', file)
})

```

3. DragEvent.dataTransfer.files

```html
<body>
  <div id="output">
     将文件拖放到这里~
  </div>
</body>

<script>
  const $ = arg => document.querySelector(arg)
  let outputEle = $('#output')
  // ondragover 事件规定在何处放置被拖动的数据
  outputEle.addEventListener('dragover', dragEvent => {
    dragEvent.preventDefault()
  })
  // ondrop 事件放置文件时触发
  outputEle.addEventListener('drop', dragEvent => {
    dragEvent.preventDefault()
    // DataEvent.dataTransfer 属性保存着拖拽操作中的数据
    let files = dragEvent.dataTransfer.files
    console.log('drag files: ', files)
  })
</script>
```

## DataURL（base64）

DataURL，前缀为 data: 协议的 URL，可以存储一些小型数据

语法：data:[类型][;base64],

如：data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=

消费 Blob File 类型

1. FileReader
允许 Web 应用程序异步读取存储在用户计算机上的文件（blob 或 file）。

```js
// 如pyide 生成zip时读取图片的blob拿到base64进行压缩后再添加到zip
function fileReader (blob) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.onload = (e) => {
      resolve(e.target.result)
    }
    reader.readAsDataURL(blob)
  })
}
// 将 blob 或 file 转成 DataURL（base64） 形式
fileReader(someFile).then(base64 => {
  console.log('base64: ', base64)
})
```

2. canvasElement.toDataURL()

可以通过 canvas 图像处理能力，将图片转成 dataURL 形式。一般用于跨域图片的下载

## BlobURL(ObjectURL)

BlobURL 也叫 ObjectURL，它可以让只支持 URL 协议的 Api（如： <link> <img> <script>） 访问 file 或 blob 对象。
dynamic-import-polyfill 库也用到了其特性。

如下，生成 blobURL，createObjectURL 方法创建从 URL 到 Blob 的映射关系。
如：blob:http://eg.com/550e8400-e29b-41d4-a716-446655440000

// object 创建 URL 的 File 对象、Blob 对象或者 MediaSource 对象
let blobURL = URL.createObjectURL(object)
如下，revokeObjectURL 方法撤消 blobURL 与 Blob 的映射关系，有助于浏览器垃圾回收，提示性能。

URL.revokeObjectURL(blobURL)

## 形成闭环

blob --> file --> dataURL(base64) | blobURL --> blob




https://segmentfault.com/a/1190000022208272