## Vue源码解析(实例化前)-初始化全局

+ 初始化(initGlobalAPI(Vue))

```javascript
function initGlobalAPI (API) {
    var configDef = {}
    configDef.get = function() {
        return config
    }
    if(process.env.NODE_ENV !== 'production') {
        configDef.set = function() {
            warn(
            'Do not replace the Vue.config object, set individual fields instead.'
            )
        }
    }
    Object.defineProperty(Vue, 'config', configDef)
    
    Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
	}

	Vue.set = set
	Vue.delete = del
	Vue.nextTick = nextTick

	Vue.options = Object.create(null)
	ASSET_TYPES.forEach(function (type) {
    	Vue.option[type + 's'] = Object.create(null)
	})

	Vue.options._base = Vue

	extend(Vue.options.components, builtInComponents)

	initUse(Vue)
	initMixin$1(Vue)
	initExtend(Vue)
	initAssetReginsters(Vue)
}


```

## Vue.js技术揭秘

* [参考]: https://ustbhuangyi.github.io/vue-analysis/prepare/flow.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E7%94%A8-flow	"vue.js技术揭秘"

### 认识Flow

#### 1.Flow工作方式

* 类型推断：通过变量的使用上下文来推断出变量的类型，然后根据这些推断来检查类型
* 类型注释：事先注释好我们期待的类型，Flow会基于这些注释来判断

```javascript
/*@flow*/

class Bar {
    x: string;
	y: string | number;
	z: boolean;

	constructor(x: string, y: string | number) {
    	this.x = x
        this.y = y
        this.z = z
	}
}

var bar: Bar = new Bar('hello', 4)

var obj: {a: string, b: number, c:Array<string>, d: Bar} = {
    a: 'hello',
    b: 11,
    c: ['hello', 'world'],
    d: new Bar('hello', 1)
}
```

