## DocumentFragment

* DocumentFragment接口表示一个没有父级文件的最小文档。他被当做一个轻量版的Document使用，用于存储已排版好的或未打理好格式的XML片段。

* DocumentFragment不是真正的DOM树的一部分，它的变化不会引起DOM树的重新渲染的操作（reflow），不会导致性能问题。

  ```javascript
  // 示例
  const oFrag = document.createDocumentFragment()
  
  for(let i = 0; i < 100; i++) {
      const op = document.createElement('p')
      const oText = document.createTextNode(i)
      op.appendChild(oText)
      oFrag.appendChild(op)
  }
  document.body.appendChild(oFrag)
  ```

* 当文档碎片插入完自动会被销毁碎片内容

## JavaScript中作用域对性能的一影响

引用至： **渡一教育-每日进步一大点**

### 作用域

* 任何程序设计语言都有作用域的概念，简单说，作用域就是变量与函数可以访问的范围，即作用域控制着变量与函数的可见性和生命周期。
* 作用域是JavaScript编程中一个重要的运行机制，在JavaScript同步和异步编程以及JavaScript内存管理中起着至关重要的作用
* 在JavaScript中，能形成作用域的有以下几点
  * 函数的调用
  * with语句
    * with会创建自己的作用域，因此会增加其中执行代码的作用域的长度
  * 全局作用域
  * 块级作用域

#### 全局作用域

* 在代码中任何地方都能访问到的对象拥有全局作用域，一般来说以下几种情形拥有全局作用域
  * 最外层函数和在最外层函数外面定义的变量
  * 所有未定义直接复制的变量自动声明为拥有全局作用域
  * window对象的属性

#### 局部作用域

* 和全局作用域相反，局部作用域一般只在固定的代码片段内可以访问到，最常见的例如函数内部，所以有人把这种作用域也成为函数作用域

#### 块级作用域

* ES6中新提出了块级作用域。每个大括号中都会产生跨级作用域(对象大括号不算)

#### 作用域链

* 在JavaScript中，函数也是对象，实际上，JavaScript中里面一切皆为对象。函数对象和其他对象一样，拥有可以通过访问的属性和一系列仅供JavaScript引擎访问的内部属性。其中一个内部属性是[[Scope]]，由ECMA-262标准第三版定义，该内部属性包含了函数被创建的作用域中对象的集合，这个集合被称为函数的作用域链，它决定了哪些数据能被函数访问。

## Object常用方法

### Object.assign()

* 该方法用于将两个对象进行合并操作

* 对象中如果存在重名的键，后面的值会把前面的值覆盖掉

* 可以复制一个对象

  * ```javascript
    const obj = {a: 1}
    const copy = Object.assign({}, obj)
    ```

  * Object.assign方法的拷贝规则是：拷贝的是属性值，假如源对象的属性值是一个对象类型，那么拷贝出来的obj2并不会拷贝值，而是拷贝内存地址

### Object.entries()

* 该方法可以拿到对象的键值对

* ```javascript
  const obj = {foo: 'bar', zoo: '123'}
  console.log(Object.entries(obj))
  // [["foo", "zoo"], ["bar", "123"]]
  console.log(Object.entries(obj)[0])
  // ["foo", "zoo"]
  ```

### Object.keys()

* 该方法返回一个元素为字符串的数组，其元素来自于从给定的object上面的属性，这些属性的顺序与手动遍历该对象属性时的一致

## 深度拷贝

* ```javascript
  function deepClone(obj) {
      if(!obj && typeof obj !== 'object') {
          return
      }
      var newObj = toString.call(obj) === '[object Array]' ? [] : {}
      for(var key in obj) {
          if(obj[key] && typeof obj[key] === 'obj') {
              newObj[key] = deepClone(obj[key])
          }else {
              newObj[key] = obj[key]
          }
      }
      return newObj
  }
  ```

* ```javascript
  // 简单粗暴深拷贝
  let newArr = JSON.parse(JSON.Stringify(arr))
  
  // 隐患 JSON内部使用了递归的方式，数据一旦过多，就会有爆栈的风险
  // Maximum call stack size exceeded
  ```

* ```javascript
  // 深度拷贝的终极方案： 利用栈的思想
  function cloneForce(x) {
      const uniqueList = [] //去重
      let root = {}
      // 循环数组
      const loopList = {
          parent: root,
          key: undefined,
          data: x
      }
      
      while(loopList.length) {
          // 深度优先
          const node = loopList.pop()
          const parent = node.parent
          const key = node.key
          const data = node.data
          
          // 初始化赋值目标,key为undefined则拷贝到父元素，否则拷贝子元素
          let res = parent
          if (typeof key !== 'undefined') {
              res = parent[key] = {}
          }
          
          // 数据已存在
          let uniqueData = uniqueList.find(item => item.source === data)
          if (uniqueData) {
              parent[key] = uniqueData.target
              // 终止本次循环
              continue
          }
          
          // 数据不存在
          // 保存源数据，再拷贝数据中对应的引用
          uniqueList.push({
              source: data,
              target: res
          })
          
          for(let k in data) {
              if(data.hasOwnProperty(k)) {
                  if(typeof data[k] === 'object') {
                      loopList.push({
                          parent: res,
                          key: k,
                          data: data[k]
                      })
                  }else {
                      res[k] = data[k]
                  }
              }
          }
      }
      return root
  }
  ```