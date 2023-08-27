# Set和Map

## Set

- 类似于数组，但是成员的值都是唯一的，没有重复的值，new Set() 接受一个数组或者类数组为参数

### 去重用法

```javascript
// 数组去重
// 1 和扩展运算符（内部使用for...of循环）结合
[...new Set(array)]

// 2
function dedupe(array) {
  // Array.from可以把Set结构转成数组
  return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]

// 字符串去重
[...new Set('ababbc')].join('')
```

### 属性和方法

- `size`  长度
- `add(val)`  添加，返回自身，向 Set 加入值的时候，不会发生类型转换，所以`5`和`"5"`是两个不同的值
- `delete(val)` 删除，返回布尔
- `has(val)` 是否包含，返回布尔
- `clear()` 删除所有

**遍历方法**

- `keys()`  返回键名遍历器
- `values()`  返回键值遍历器
- `entries()`  返回键值对遍历器
- `forEach()`  遍历，顺序就是插入的顺序，参数是：键值、键名、集合本身

::: tip
Set 结构没有键名，只有键值（键名和键值是同一个值）

可以用`for...of`直接遍历`Set`结构实例

:::

### 实现并集、交集、差集

```javascript
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```

**如果想在遍历操作中，同步改变原来的 Set 结构，目前没有直接的方法**

```javascript
// 方法一
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));
// set的值是2, 4, 6

// 方法二
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
// set的值是2, 4, 6
```

## WeakSet 

### 和Set的区别

- 成员只能是对象

- 对象都是弱引用

  即垃圾回收机制不考虑 `WeakSet` 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 `WeakSet` 之中

  `WeakSet` 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 `WeakSet` 里面的引用就会自动消失

  由于 `WeakSet` 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 `WeakSet` 不可遍历

- 没有`size`属性
- `add()`、`delete()`、`has()`

::: tip

WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏

:::

## Map

- 类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键

- `new Map()` 参数是键值对数组

```javascript
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
])

// 等于

const items = [
  ['name', '张三'],
  ['title', 'Author']
]

const map = new Map()

items.forEach(
  ([key, value]) => map.set(key, value)
)
```

`Map` 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键

### 属性和方法

- `size`
- `set(key, value)`
- `get(key)`
- `has(key)`
- `delete(key)`
- `clear()`

**遍历方法**

- `keys()`  返回键名遍历器
- `values()`  返回键值遍历器
- `entries()`  返回键值对遍历器
- `forEach()`  遍历，顺序就是插入的顺序，参数是：键值、键名、集合本身



 Map 结构的默认遍历器接口（`Symbol.iterator`属性），就是`entries`方法



### 和其他数据结构互相转换

- Map转数组：用扩展运算符

- 数组转Map：传入`Map`构造函数

- Map转对象：如果所有 Map 的键都是字符串，它可以无损地转为对象；如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名

```javascript
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
```

- 对象转Map

```javascript
// 1
let obj = {"a":1, "b":2};
let map = new Map(Object.entries(obj));

// 2
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({yes: true, no: false})
// Map {"yes" => true, "no" => false}
```

- Map转JSON

- JSON转Map



## WeakMap

### 和Map的区别

- `WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名
- `WeakMap`的键名所指向的对象，不计入垃圾回收机制
- 没有size属性，没有遍历方法
- 无法清空
