## 对MVVM的理解，与MVC有什么不同

* MVC指的是Model-View-Controller，即模型-视图-控制器。
  * 使用MVC的目的就是将模型与视图分离。
  * MVC属于单向通信，必须通过Controller来承上启下，即必须由控制器来获取数据，将结果返给前端，页面再重新渲染。

* MVVM指的是Model-View-ViewModel，即模型-视图-视图模型，模型指的是后端传递的数据，视图指的是所看到的页面，视图模型是MVVM的核心，他是连接View与Model的桥梁，实现view的变化会自动更新到viewModel中，viewModel中的变化也会自动显示在view上，是一种数据驱动视图的模型。

区别：

* MVC中的Control在MVVM中演变成viewModel
* MVVM通过数据来显示视图，而不是通过节点操作
* MVVM主要解决了MVC中大量的DOM操作，使页面渲染性能降低，加载速度慢，影响用户体验的问题。

## Vue响应式数据的原理

Vue底层对于响应式数据的核心是Object.defineProperty，Vue在初始化数据时，会给data中的属性使用Object.defineProperty重新定义属性（劫持属性的getter和setter），当页面使用对应属性时，会进行依赖手机（收集当前组件的watcher），如果属性发生变化，会通知相关依赖进行更新操作。

* 总结：Vue通过数据劫持配合发布者-订阅者的设计模式，内部通过调用object.defineProperty()来劫持各个属性的getter和setter，在数据变化的时候通知订阅者，并处罚相应的回调。