## useEffect

副作用函数：和函数业务主逻辑关联不大的函数，在特定的时间和事件执行。

代替componentDidMount和componentDidUpdate生命周期函数

### 实现comonentWillUnmount生命周期函数

在销毁之前执行

```react
import React, {useEffect} from 'react'

function Example() {
    useEffect(() => {
    console.log('useEffect')
    return () => {
      console.log('componentWillUnmount------')
    }
  }, [])
  
  return (
  	<div>123</div>
  )
}
```

## useContext

实现父子组件传值

使用createContext创建需要传递的数据

```react
const CountContext = createContext();

function Example() {
  return (
  	<div>
    	<CountContext.Provider value={}>
      	/*子组件*/
      </CountContext.Provider>
    </div>
  )
}

// 子组件

function Counter() {
  
  let count = useContext(CountContext)
  
  return (
  	<div></div>
  )
}
```

## useReducer

通常和usecontext一起使用 类似于redux

```javascript
// Reducer
function countReducer(state, action) {
  switch(action.type) {
    case 'add':
      return state + 1
    case 'sub':
      return state - 1
    default:
      return state
  }
}
```





