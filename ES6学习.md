## let和const命令

* let命令用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效
* const声明一个只读常量。一旦声明，常量的值就不能改变。

## 对async函数的理解

* async函数就是Generator函数的语法糖

```javascript
var fs = require('fs')

var readFile = function(fileNmae) {
    return new Promise(function(resolve, reject) {
        fs.readFile(fileName, function(error, data) {
            if(error) reject(error)
            resolve(data)
        })
    })
}

var gen = function* () {
    var f1 = yeild readFile('/etc/fstab')
    var f2 = yeild readFile('/etc/shells')
    console.log(f1.toString())
    console.log(f2.toString())
}
```

转变为async函数

```javascript
var asyncReadFile = async function() {
    var f1 = await readFile('/etc/fstab')
    var f2 = await readFile('/etc/shells')
    console.log(f1.toString())
    console.log(f2.toString())
}
```

** async函数就是将Generator函数的星号替换成了async，将yield替换成了await **

* async用于申明一个function是异步的，而await用于等待一个异步方法执行完成。
* async函数返回的是一个Promise对象，如果函数中return一个直接量，async会把这个直接量通过Promise.resolve()封装成Promise对象

```javascript
/*简单示例*/
function asyncfun() {
    let res = 100
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(res)
        }, 1000)
    })
}

async function getRes() {
    const res = await asyncfun()
    console.log(res)
}
getRes()
```

## 数组的解构赋值

* 基本用法：

  ```javascript
  let a = 1
  let b = 2
  let c = 3
  
  //es6中允许写成下面这样
  let [a, b, c] = [1, 2, 3]
  ```

  上面代码表示可以从数组中提取值，按照对应位置，对变量赋值

## 函数与解构赋值默认值结合使用

```javascript
function foo({x, y = 5}) {
    console.log(x, y)
}

foo({}) undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo()
```

## 数组的扩展

* 扩展运算符(...)
  * 扩展运算符(spread)是三个点(...)。它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列。

```javascript
console.log(...[1, 2, 3])
// 1 2 3
[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]
```

* 该运算符主要用于函数调用

  ```javascript
  function push(array, ...items) {
      arr.push(...item)
  }
  
  function add(x, y) {
      return x + y
  }
  
  const number = [4, 38]
  add(...numbers)
  
  // 代替apply方法
  var numbers = [4, 6, 2, 3, 7, 9]
  // var max = Math.max.applay(null, numbers)
  var max = Math.max(...numbers)
  console.log(max)
  ```

* Array.from()

  * Array.from()方法用于将两类对象转为真正的数组。

  ```javascript
  let arr = {
      '0': 'a',
      '1': 'b',
      '2': 'c'
  }
  let arr2 = Array.from(arr)
  ['a', 'b', 'c']
  ```

* 数组示例的find()和findIndex()

  * 数组实例的find方法，用于找出第一个符合条件的数组成员。

  ```javascript
  [1, 4, 5, -1, 9].find(n => n < 0)
  ```

* 数组实例的`findIndex`方法的用法与`find`方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回`-1`

