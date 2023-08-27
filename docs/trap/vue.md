# Vue

## el-form

当使用v-if渲染form的form-item时，rules有时候会绑定不上，使用validate的时候无法触发校验规则。

原因：form绑定规则时是在mounted中绑定的，被v-if隐藏的form-item并没有挂载，多个相同form-item渲染时会被复用，导致校验规则没有绑定上。

**解决办法：给`el-form-item`绑定一个唯一的`key`，这样`v-if`时会重新渲染**

## vue-router

不同的路由指向同一个页面时，在这两个路由切换时，不会触发页面的`created/mounted`，要监听路由变化把`created/mounted`里面的再执行一次（或者`updated`里执行？

```javascript
watch: {
	routeName() {
        // func...
    }
}
```

## .cache



## nginx压缩



## 全局使用CSS变量

vue.config.js配置
```javascript
css: {
    requireModuleExtension: true,
    loaderOptions: {
        sass: {
        prependData: '@import "@/styles/variables.scss";' // 可全局使用 variables.scss 中的变量
        }
    }
}
```

## reverse()

reverse会改变数组本身，在计算属性中不能直接用
```javascript
computed: {
    arr2() {
        return this.arr1.slice(0).reverse()
    }
}
```