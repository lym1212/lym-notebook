# Vue.js实战笔记

# **Vue.js实战**

## **第一章**

- 渐进式框架
- MVVM模式
- 不直接操作DOM，数据驱动DOM
- 视图和数据
- 传统的前端开发模式：jQuery+++++++++++++
- 提升开发效率，降低维护成本

## **第二章**

### **2.1**

- 数据的双向绑定

```jsx
// 创建实例
var app = new Vue({
	el: '#app' // 必填 指定DOM元素
})
// 可以通过app.$el访问该元素
```

- 生命周期
    - created：实例创建完成，DOM未挂载
    - mounted：DOM挂载后
    - beforeDestroy：实例销毁前，removeEventListener
- 文本插值方法`{{}}`：不支持语句和流控制（要使用三元运算符）
- 输出HTML（XSS攻击）
    
    ```html
    <span v-html="link"></span>
    ```
    
    ```jsx
    var app = new Vue({
        el: '#app',
        data: {
            link: '<a href="#">This is a link.</a>'
        }
    })
    ```
    
- 不需要编译， 原样输出
    
    ```html
    <span v-pre>{{ this will not be compiled }}</span>
    ```
    
- 过滤器：格式化文本，比如时间格式化
    - 可以串联，接收参数

### **2.2 指令 v-**

### **2.3 语法糖**

## **第三章**

### **计算属性**

- 每一个计算属性都包含一个getter和setter，可以以来其他实例的数据
- 基于它的依赖缓存的，依赖的数据发生变化才会重新取值

## **第四章**

### **动态绑定class和style**

- 对象语法
- 数组语法

## **第五章**

### **基础指令**

- v-cloak：实例结束编译时从绑定的html元素上移除
- v-once：只渲染一次

### **条件渲染指令**

- v-if、v-else-if、v-else：会销毁和重建

> 切换显示时不想被复用就加个key，key值唯一
> 
- v-show：display切换，使用频繁切换

> 不能在`<template>`上使用
> 

### **列表渲染指令**

- v-for
- 触发视图更新的数组方法：push、pop、shift、unshift、splice、sort、reverse

### **方法和事件**

- VM销毁时，@绑定的事件都会自动删除
- $event可以访问原生DOM事件对象

### **修饰符**

> 修饰符可串联
> 
- .stop：阻止冒泡
- .prevent：阻止默认行为
- .capture：捕获模式
- .self：在该元素本身触发时才触发
- .once：只触发一次
- 按键修饰符
    
    ```html
    <!-- keyCode是13时调用 -->
    <input @keyup.13="submit" />
    ```
    
    - 可配置
    
    ```jsx
    Vue.config.KeyCodes.f1 = 112
    // @keyup.f1
    ```
    
    - 一些快捷名称（都可以组合使用）
        - .enter
        - .tab
        - .delete（删除和退格）
        - .esc
        - .space
        - .up
        - .down
        - .left
        - .right
        - .ctrl
        - .alt
        - .shift
        - .meta（Command和窗口键）

## **第六章**

### **表单的数据双向绑定**

- `v-model`修饰符
    - `.lazy`：`change`事件同步（默认是`input`事件同步）
    - `.number`： 将输入值转换成`Number`类型
    - `.trim`：过滤首尾空格

## **第七章**

### **7.1 组件**

- 提高代码重用性
- 全局注册

```jsx
Vue.component('my-component', {
    template: '<div>组件内容</div>'  // DOM结构必须被一个元素包含
})
```

- 局部注册

```jsx
var Child = {
    template: '<div>组件内容</div>'
}

var app = new Vue({
    el: '#app',
    components: {
        'my-components': Child
    }
})
```

- `<table>`标签内直接使用组件无效，要使用is属性

### **7.2 props**

- 字符串数组或对象形式（父传子，单向数据流）
- 验证函数：`validator(value) {}`

### **7.3 组件通信**

- 父子组件、兄弟组件、跨级组件
- 子组件`$emit()`，父组件`$on()`或者v-on监听

> 组件上监听原生DOM事件，用.native
> 
- $emit事件名为input时，可以用v-model绑定

```jsx
<my-cpt v-model="total" />
// 语法糖
<my-cpt @input="func" />

// 子组件
this.$emit('input', this.count)
```

- v-model创建自定义表单输入组件
    - props接收一个value
    - 有新的value时触发input事件
- 事件总线：创建一个空的Vue实例
- 父链：this.$parent访问父组件或实例，this.$children访问所有子组件（可以递归向上或向下，适合独立组件使用）
- 避免父子组件紧耦合，最好通过props和$emit通信
- 子组件索引：添加ref

### 7.4 slot分发内容

- Vue组件的3个API来源：prop、events、slot
- 单个slot：父组件没插入内容，会默认显示子组件的slot
- 具名slot：`<slot name="header" />`
- 作用域插槽：让父级插槽可以使用子组件的数据

```html
<!-- 子组件 -->
<ul>
  <slot name="book" v-for="book in books" :book-name="book.name"></slot>
</ul>

<!-- 父组件 -->
<my-list :books="books">
  <template slot="book" scope="props">
    <li>{{ props.bookName }}</li>
  </template>
</my-list>
```

- 访问slot：this.$slots

### 7.5

- 递归组件：必须限制数量，可以用来开发未知层级的独立组件，级联选择器和树形控件
- 内联模板：给标签添加inline-template属性（父子组件声明的数据都可以使用，同名优先子组件，作用域难理解）
- 动态组件：`<component>`的is属性
- 异步组件

### 7.6

- $nextTick：DOM更新完成
- `<script type="text/x-template"></script>`
- 手动挂载实例：Vue.extend和$mount

## 第八章

- 自定义指令，全局注册和局部注册

```jsx
Vue.directive('focus', {})

var app = new Vue({
	el: '#app',
	directives: {
		focus: {}
	}
})
```

**自定义指令选项（钩子函数）**

- bind：初始化，只调用一次（绑定事件）
- inserted：被绑定元素插入父节点时调用
- update：被绑定元素所在模板更新时调用，不论绑定值是否变化
- componentUpdated：被绑定元素所在模板完成一次更新周期调用
- unbind：解绑时调用（解绑事件）

**钩子函数参数**

- el：绑定的元素
- binding
    - name：指令名
    - value
    - oldValue
    - expression：绑定值的字符串形式
    - arg
    - modifiers
- vnode
- oldVnode：上一个虚拟节点，update和componentUpdated中可用

## 第九章 Render函数

- 虚拟DOM：一个轻量级的JS对象，状态改变时进行Diff运算，基于JS运算
- VNode类：每个DOM元素或组件都对应一个VNode对象
- Render函数通过createElement来创建Virtual Dom

### 9.3 createElement

- 参数
    - 第一个参数必选：html标签 or 组件 or 函数
    - 第二个参数可选：数据对象
    - 第三个参数可选：子节点（String | Array）
- 在所有组件树中，如果VNode时组件，VNode必须唯一
- 重复渲染多个组件或元素的方法
- Render函数不再需要自定义指令，没有v-model、修饰符

### 9.4 函数化组件

- functional为true时，可以使组件无状态和无实例，没有data和this上下文，更容易渲染
- Render函数第二个参数context提供临时上下文
- 适用场景
    - 程序化地在多个组件中选择一个
    - 将children、props、data传递给子组件之前操作他们

### 9.5 JSX

看起来像html，实际时JS的语法扩展

- webpack插件  `babel-plugin-transform-vue-jsx`

## 第十章 webpack

- 每个文件都是一个模块，不同的模块需要用不同的loader
- webpack-dev-server
- webpack.config.js

```jsx
var path = require('path')

var config = {
		entry: {
				main: './main'
		},
		output: {
				path: path.join(__dirname, './dist'),  // 打包后文件输出目录
				publicPath: '/dist/',  // 资源文件引用目录
				filename: 'main.js'  // 输出文件的名称
		}
}

module.exports = config
```

- extract-text-webpack-plugin：提取所有css生成一个main.css
- Entry、Output、Loaders、Plugins
- url-loader、file-loader：图片、字体等文件

## 第十一章 插件

### vue-router

- `<router-link>`：to、tag、replace、active-clas
- this.$router.push()、this.$router.replace()、this.$router.go()
- beforeEach修改window.document.title

### Vuex

- 统一管理组件状态：state、mutations（改变数据）、getters、actions（异步，存在业务逻辑）、modules

```jsx
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	
})

new Vue({
	store
})
```

- this.$store.state  读取
- this.$store.commit  修改
- getter可以依赖其他的getter
- this.$store.dispatch 触发action

## 第十二章

### iView

## 第十五章

### SSR

- 搜索引擎优化
- 客户端网络不稳定
- Node.js做中间层负责渲染

### Nuxt.js

- 基于Vue.js的通用应用框架，为Node.js做Vue的服务端渲染提供了各种配置

### axios

- 基于Promise，支持浏览器端和Node.js的HTTP库

### vue-i18n

- 多语言解决方案