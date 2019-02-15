## async/await和promise的执行顺序

+ 今日头条面试题

```javascript
async function async1 () {
    console.log('async1 start') // 2
    await async2 () // await Promise.resolve(undefined)
    // 如果一个Promise被传递给一个await操作符，await将等待Promise正常处理完成并返回其处理结果
    // 等待第5个打印后会返回一个                                       	Promise.resolve(undefined).then((undefined) => {})
    // 这里需要等待then执行后才能继续执行下面的代码，所以先执行了下面的then
    console.log('async1 end') // 7
}

async function async2() {
    console.log('async2') // 3
}

console.log('script start')  // 1

setTimeout(function () {
    console.log('setTimeout')  // 8
}, 0)

async1()

new Promise(function (resolve) {
	console.log('promise1') // 4
	resolve()
}).then(function () {
    console.log('promise2') // 6
})

console.log('script end') // 5
```

注意点：

1. async 做了一件什么事情？
2. await在等什么？、
3. await等到之后，做了一件什么事情？
4. async/await比promise有哪些优势?

### async做了一件什么事？

带async关键字的函数，它使得你的函数的返回值必定是promise对象

也就是说，如果async关键字函数返回的不是promise，会自动用Promise.resolve()包装

如果async关键字函数显示的返回promise，那么就以返回的promise为准

```javascript
async function fn1 () {
	return 123
}

function fn2 () {
    return 123
}

console.log(fn1())
console.log(fn2())

//终端输出
promise {<resolved>: 123}
123
```

*注意*

+ 在语义上要理解，async表示函数内部有异步操作
+ 一般await关键字要在async关键字函数的内部，await写在外面会报错

### await在等什么？

await等的是右侧`表达式`的结果

也就是说，右侧如果是函数，那么函数的return值就是`表达式的结果`

### await等到之后做了一件什么事？

* 右侧表达式的结果，就是await要等的东西
* 等到之后，对于await来说，分两种情况：
  * 不是promise对象
    * await会阻塞后面的的代码，先执行async外面的同步代码，同步代码执行完再回到async内部，把这个promise的东西，作为await表达式的结果
  * 是promise对象
    * await会暂停后面的代码，先执行async外面的同步代码，等着promise对象fulfilled，然后把resolve的参数作为await表达式的运算结果