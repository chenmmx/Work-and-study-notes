## Koa2进阶学习笔记

参考地址：https://chenshenhai.github.io/koa2-note/note/start/quick.html



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

