## Koa框架源码，搞懂compose核心

一个简单的http服务

```javascript
const http = require('http')

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('hello')
})

const hostname = '127.0.0.1'
const port = 3000
server.listen(port, hostname, () => {
    console.log('server is runing!')
})
```

通过Koa创建一个server

```javascript
const Koa = require('koa')
const app = new Koa()

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    ctx.set('X-Response-Time', `${ms}ms`)
})

// longer
app.use(async (ctx, next) => {
    const start = Date.now()
    await next
    const ms = Date.now = start
    console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

// response
app.use(async (ctx) => {
    ctx.body('hello')
})

app.listen(3000)
```

上面代码的执行顺序是：

请求->x-response-time 中间件 ->longer中间件->response中间件->longer中间件->response-time中间件->响应

Koa所有的功能都是通过中间件实现的

每个中间件默认接受两个参数，第一个参数是Context对象，第二个参数是next函数。只要调用next函数，就可以把执行权交给下一个中间件。

如果中间件内部没有调用next函数，那么执行权就不会传递下去

* 多个中间件会形成一个栈结构(middle stack) ，以'先进先出'(first-in-last-out)的顺序执行，整个过程就像先入栈，然后出栈的操作。

```javascript
// Koa的中间件机制(源码分析)

class Application extends Emitter {
    constructor() {
        super()
        this.middleware = []
    },
    use(fn) {
    	this.middleware.push(fn)
        return this
    },
    callback() {
    	const fn = componse(this.middleware)
                
        return function(req, res) {
        	return fn(ctx)
        }
    },
    listen(...args) {
    	const server = http.createServer(this.callback())
    	return server.listen(...args)
    }
    
}
```

以上代码分析

* 定义了一个middleware数组来存储中间件
* 定义了一个use方法来注册一个中间件，简单的push到自身的middleware这个数组中
* 使用了一个componse方法，传入middleware，返回了一个可执行的方法

compose为中间件框架的核心