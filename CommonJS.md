## 模块化规范

### CommonJS

* Node应用又模块组成，采用CommonJS模块规范。每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。在服务端，模块的加载是运行时同步加载的；在浏览器端，模块需要提前编译打包处理。
* 特点
  * 所有代码都运行在模块作用域，不会污染全局作用域
  * 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就是读取缓存结果。想要让模块再次运行，必须清除缓存。
  * 模块加载的顺序，按照其在代码中出现的顺序。
* 基本语法
  * 暴露模块: `module.exports = value` 或 `exports.xxx = value`
  * 引入模块：`require(xxx)`，如果是第三方模块，xxx为模块名；如果是自定义模块，xxx为模块文件路径

```javascript
//example.js
var x = 5
var addX = function(value) {
    return value + x
}
module.exports.x = x
module.exports.addX = addX
```

上面代码通过module.exports输出变量x和函数addX

```javascript
var example = require('./example.js')
console.log(example.x) // 5
console.log(example.addX(1)) // 6
```

require命令用于加载模块文件。require命令的基本功能是读入并执行一个JavaScript文件，然后返回该模块的exports对象，如果没有发现指定模块，会报错。

* 模块的加载机制
  * CommonJS模块的加载机制是，输入的是被输出值的拷贝。也就是说，一旦输出一个值，模块内部的变化影响不到这个值。这点与ES6模块化有重大差异

举个栗子：

```javascript
// lib.js
let counter = 3
function incCounter() {
    counter ++
}

module.exports = {
    counter: counter,
    incCounter: incCounter
}

// 上面代码输出内部变量counter和改写这个变量的内部方法IncCounter

// main.js
var counter = require('./lib').counter
var incCounter = require('./lib').incCounter

console.log(counter) // 3
incCounter()
console.log(counter) // 3

//上面代码说明，counter输出以后，lib.js模块内部的变化就影响不到counter了。这是因为counter是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值
```

