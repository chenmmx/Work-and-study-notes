## Koa2进阶学习笔记

参考文档地址：https://chenshenhai.github.io/koa2-note/note/start/quick.html

### 示例代码

```javascript
// 原生路由实现
const Koa = require('koa')

const app = new Koa()

app.use(async (ctx) => {
    ctx.body = 'hello koa'
})

app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')
```

koa2是基于async/await操作中间件

### 源码文件

```javascript
├── lib
│   ├── application.js
│   ├── context.js
│   ├── request.js
│   └── response.js
└── package.json
```

### 使用koa-router中间件

```javascript
// yarn add koa-router

const Koa = require('koa')
const fs = require('fs')
const Router = require('koa-router')

const app = new Koa()

let router = new Router

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
    console.log('[demo] koa-router is starting at port 3000')
})
```

### 静态资源加载----koa-static中间件使用

```javascript
const Koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app = new Koa()

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'

app.use(static(
	path.join(_dirname, staticPath)
))

app.use( async (ctx) => {
    ctx.body = 'hello world'
})

app.listen(3000, () => {
    console.log('[deomo] koa-static is starting at port 3000')
})
```

### Koa中使用cookie

+ ctx.cookie.get(name, [option])读取上下文中cookie
+ ctx.cookie.set(name, value, [option])在上下文中写入cookie

### Koa加载模板引擎

```javascript
// 模块安装

// 安装koa模板使用中间件
yarn add koa-views
// 安装ejs模板引擎
```

```javascript
// 示例代码
// index.js

const Koa = require('koa')
const views = require('koa-views')
const path = require('path')

const app = new Koa()

app.use( async (ctx) => {
    let title = "hello koa2"
    await ctx.render('index', {
        title
    })
})

app.listen(3000)
```

```ejs
index.ejs模板
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
</head>
<body>
    <h1><%= title %></h1>
    <p>EJS Welcome to <%= title %></p>
</body>
</html>
```

详情查看官方文档：https://github.com/mde/ejs

### Koa中使用文件上传

```javascript
// 安装模块
yarn add busboy
// busboy模块是用来解析POST请求，node原生中的文件流
```

```javascript
// 示例代码

const inspect = require('util').inspect
const path = require('path')
const fs = require('fs')
const Busboy = require('busboy')

const busboy = new Busboy({ headers: req.headers })

// 监听文件解析事件
busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    // 文件保存到特定路径
    file.pipe(fs.createWriteStream('/upload'))
    
    // 解析文件流
    file.on('data', function(data) {
        
    })
    
    // 解析文件结束
    file.on('end', function() {
        
    })
    
})
    
// 监听请求中的字段
busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated){
        
})
    
// 监听结束事件
busboy.on('finish', function() {
    
})

req.pipe(busboy)
```

```javascript
// 使用koa-body处理文件上传
yarn add koa-body
```

```javascript
const Koa = require('koa')
const koaBody = require('koa-body')

const app = new Koa()

app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024 // 设置文件上传大小最大限制 2M
    }
}))

app.listen(3000, () => {
    console.log('server is listening in port 3000')
})
```

```javascript
// 接收到文件后，需要将文件保存到目录中，返回一个url给前端
// 1.创建可读写流 const reader = fs.createReadStream(file.path)
// 2.创建可写流 const write = fs.createWriteStream('upload/newpath.txt')
// 3.可读流通过管道写入可写流 reader.pipe(write)
```

```javascript
const router = require('koa-router')()
const fs = require('fs')

router.post('/upload', async (ctx) => {
    const file = ctx.request.files.file
    const reaer = fs.createReadStream(file.path)
    const ext = file.name.split('.').pop()
    const upStream = fs.createWriteStream(`upload/${Math.random().toString}.${ext}`)
    reader.pipe(upStream)
    return ctx.body = '上传成功'
})
```

