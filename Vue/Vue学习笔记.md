## 实例生命周期钩子

每个Vue实例在被创建时都要经过一系列的初始化过程--例如，需要设置数据监听、编译模板、将实例挂载到DOM并在数据变化时跟新DOM等。同时在这个过程中也会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会。

* created() 实例创建完成后调用，此阶段完成了数据的观测等，但尚未挂载，$el还不可用。需要初始化处理一些数据时会比较有用。
* mounted el挂载到实例上后调用，一般我们的第一个业务逻辑会在这里开始。
* beforeDestory 实例销毁之前调用。主要解绑一些addEventListener监听事件等。

## MVVM模式

与前端框架Angular、Ember等一样。由经典的软件架构MVC衍生来的。当View变化时，会自动跟新到ViewModel，反之亦然。View和ViewModel之间通过双向绑定建立联系

## 指令与事件

* v-if
* v-bind：动态跟新HTML元素上的属性，比如id、class等
* v-on：绑定事件监听器

## 计算属性

所有的计算属性都以函数的形式写在Vue实例内的computed选项内，最终返回计算后的结果

## 修饰符

.stop：阻止事件冒泡 <a @click.stop='表达式'></a>

.prevent：提交事件不再重载页面

## v-model

* 使用v-model后，表单控件显示的值只依赖所绑定的数据，不再关心初始化时的value属性

## ## 使用props传递数据

* 父组件向子组件传递数据或参数

```vue
Vue.component('my-component', {
    props: ['message'],
    template: '<div> {{message}} </div>'
})
```

* props中声明的数据与组件data函数return的数据主要区别就是props的来自父级，而data中的是组件自己的数据，作用域就是组件本身
* vue2.x通过props传递数据是单向的了，也就是父组件数据变化时会传递给子组件，但反过来不行。尽可能将父组件解耦，避免子组件无意中修改了父组件状态

## 数组函数

```javascript
/*filter*/
//将数组中的某些元素过滤掉，返回剩下的元素
var arr = [
    {
        id: 1,
        name: '11'
    },
    {
        id: 2,
        name: '22'
    },
    {
        id: 3,
        name: '33'
    }
]

var result = arr.filter(function(ele) {
    return ele.id != 2
})
// result [{id: 1, name: '11'},{id: 3, name: '33'}]

/*sort*/
//对数组进行排序
var arr = [1,76,4,643,2,63,46,45,7,63]
arr.sort((a,b) => a-b) //对数组进行升序排序
arr.sort((a,b) => b-a) //对数组进行降序排序

/*map*/
//创建一个新数组，其结果是该数组中的每个元素都调用一个提供函数后返回的结果
var arr = [1,4,9,16]
const map1 = arr.map(x => x * 2)
console.log(map1) // [2,8,18,32]

/*find*/
//返回数组中满足提供的测试函数的第一个元素的值。否则返回undefined
var arr = [1,2,15,8,16,22]
var found = arr.find(function(ele) {
    return ele > 10
})
console.log(found) //15
```

## VUE的MVVM模式的实现

* 核心方法 `Object.defineProperty`
  * 该方法为ES5的方法，所以不支持IE6-8

```javascript
var a = {}
Object.defineProperty(a, 'b', {
    value: 123, //设置的属性值
    writable: false, //是否只读
    enumerable: false, // 是否可枚举
    configurable: false // 总开关
})
console.log(a.b) 123
```

* 该方法有三个参数，都是必填参数
  * 第一个参数：目标对象
  * 第二个参数：需要定义的属性或方法的名字
  * 第三个参数：目标属性所拥有的特性
    * get()：函数，获取属性值时执行的方法(`不可和writeable、value属性共存`)
    * set()：函数，设置属性值时执行的方法(`不可和writeable、value属性共存`)
* 通过这个`Object.defineProperty`这个方法，可以实现对定义的引用数据类型实现监听，被方法监听后的对象，里面定义的值发生被获取和设置操作时，会分别触发`Object.defineProperty`里面参数三的`get`和`set`方法

```javascript
// 实现数据的劫持功能
function MyVue (options = {}) {
    this.$options = options
    var data = this._data = this.$options.data
    observe(data)
}

// 给需要观察的对象都添加Object.defineProperty的监听
function Observe (data) {
    for (let key in data) {
        let val = data[key]
        observe(val)
        Object.defineProperty(data, key, {
            enumerable: true,
            get() {
                return val
            },
            set(newval) {
                if(val === newval) { 
                    return
                }
                val = newval
                observe(newval)
            }
        })
    }
}

function observe(data) {
    if(typeof data != 'object') return
    return new Observe(data)
}
```

