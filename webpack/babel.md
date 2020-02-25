## @babel/core

* babel的核心模块
* 安装：yarn add @babel/core --dev

## @babel/cli

* babel的终端运行工具，内置的插件，运行从终端使用babel的工具
* 安装：yarn add @babel/cli --dev
* 用法：在package.json中添加

```javascript
{
    "name": "babel-basic",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
+       "build": "babel src -d lib"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
+       "@babel/cli": "^7.8.4",
+       "@babel/core": "^7.8.4"
    }
}
```

* 运行：yarn build

## 插件plugins

* 本质就是一个js程序，指示着babel如何对代码进行转换
* 可以编写自己的插件来应用想要转换的任何代码
* 例如：@babel/plugin-transform-arrow-functions 作用：将箭头函数转换为ES5兼容的函数

## presets

* 可以理解为presets就是一组插件的集合
* 例如：@babel/preset-env
  * 包含了支持现代JavaScript(ES6+)的所有插件
  * 所以安装了env preset之后，就可以看到其他ES6语法的转换

## 创建babel.config.js

```javascript
const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "10",
        chrome: "64",
        firefox: "60",
        safari: "11.1"
      }
    }
  ]
]

module.exports = {presets};
```

作用：

* 使用了env preset这个preset
* 只会为目标浏览器中没有的功能加载转换插件

## polyfill

* 知道你的环境不允许，就帮助引用一个这个环境

### @babel/polyfill

* 模拟完成ES6 + 环境
* 可以使用像Promise或者WeakMap这样的内置函数
* 可以使用像Array.from或者Object.assign这样的静态方法
* 可以使用像Array.prototype.includes这样的实例方法
* generator函数

为了实现这一点，polyfill增加了全局范围以及像String这样的原生原型

并且@babel/polyfill模块包括了core-js和自定义regenerator runtime

对于应用程序，建议安装使用@babel/polyfill

安装：

```javascript
yarn add @babel/polyfill
```

Babel.config.js调整为

```javascript
const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "10",
        chrome: "64",
        firefox: "60",
        safari: "11.1"
      },
      useBuiltIns: "usage"
    }
  ]
]

module.exports = {presets};
```

在Babel7.4.0版本以上不推荐使用

而是推荐使用core-js@3 + @babel/preset-env然后设置@babel/preset-env的corejs选项为3

安装: 

```javascript
yarn add core-js@3
```

添加选项：

```javascript
const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "10",
        chrome: "64",
        firefox: "60",
        safari: "11.1"
      },
      useBuiltIns: "usage",
      corejs: 3
    }
  ]
]

module.exports = {presets};
```

## 总结

* babel/cli允许我们从终端运行babel
* env preset只包含我们使用的功能的转换，实现我们的目标浏览器中缺少的功能