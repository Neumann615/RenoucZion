# vue

## vue 中 MVVM 的理解

M：Model（数据模型）：指代表真实状态内容的领域模型（面向对象），或只代表内容的数据访问层（以数据为中心）

V：View（视图）：指与用户交互的页面，UI 相关的东西。

VM:View-Model（视图模型）:管理视图和模型的转换，是两者之间的通信桥梁，一方面实现了数据绑定，将Model的变化实时的反映到视图中，另一方面实现了dom监听，当dom发生一些事件触发时，可以修改需要修改的相关数据。

在MVVM架构下，View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互，Model 和 ViewModel 之间的交互是双向的， 因此View 数据的变化会同步到Model中，而Model 数据的变化也会立即反应到View 上。

## vnode 中的 shapeFlag 和 patchFlag 属性

### shapeFlag

vnode 中的 shapeFlag 属性使用二进制的方式描述组件的类型，shapeFlag 的值类型是一个枚举

```js
export const enum ShapeFlags {
  // 表示一个普通的HTML元素
  ELEMENT = 1,
  // 函数式组件
  FUNCTIONAL_COMPONENT = 1 << 1,
  // 有状态组件
  STATEFUL_COMPONENT = 1 << 2,  
  // 子节点是文本
  TEXT_CHILDREN = 1 << 3, 
  // 子节点是数组
  ARRAY_CHILDREN = 1 << 4, 
  // 子节点是插槽
  SLOTS_CHILDREN = 1 << 5, 
  // 表示vnode描述的是个teleport组件
  TELEPORT = 1 << 6, 
  // 表示vnode描述的是个suspense组件
  SUSPENSE = 1 << 7, 
  // 表示需要被keep-live的有状态组件
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8, 
  // 已经被keep-live的有状态组件
  COMPONENT_KEPT_ALIVE = 1 << 9, 
   // 组件，有状态组件和函数式组件的统称
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT
}
```

一个 vnode 可以是很多不同的类型，如：

```js
vnode.shapeFlag = ShapeFlags.ELEMENT | ShapeFlags.ARRAY_CHILDREN;
```

判断某个 vnode 的类型时可以使用 vnode.shapeFlag & ShapeFlags.ELEMENT 的方式进行判断，或判断 vnode 是否同时是多种类型 vnode.shapeFlag & ShapeFlags.ELEMENT | ShapeFlags.ARRAY_CHILDREN

### patchFlag

patchFlag 是在编译 template 模板时给 vnode 添加的一个标识信息，这个标识信息反映了这个 vnode 在更新时那些部分可能会产生变化，这样在 runtime 时可以根据 patchFlag 准确判断更新，减少 diff 对比次数，提升性能。
patchFlag 的类型和 shapeFlag 相同，都为枚举类型

```js
export const enum PatchFlags {
  // 表示vnode具有动态textContent的元素
  TEXT = 1,
  // 表示vnode具有动态的class
  CLASS = 1 << 1,
  // 表示具有动态的style
  STYLE = 1 << 2,
  // 表示具有动态的非class和style的props
  PROPS = 1 << 3,
  // 表示props具有动态的key，与CLASS、STYLE、PROPS冲突
  FULL_PROPS = 1 << 4,
  // 表示有监听事件(在同构期间需要添加)
  HYDRATE_EVENTS = 1 << 5,
  // 表示vnode是个children顺序不会改变的fragment
  STABLE_FRAGMENT = 1 << 6,
  // 表示children带有key的fragment
  KEYED_FRAGMENT = 1 << 7,
  // 表示children没有key的fragment
  UNKEYED_FRAGMENT = 1 << 8,
  // 表示vnode只需要非props的patch。例如只有标签中只有ref或指令
  NEED_PATCH = 1 << 9,
  // 表示vnode存在动态的插槽。例如动态的插槽名
  DYNAMIC_SLOTS = 1 << 10,
  // 表示用户在模板的根级别存在注释而创建的片段，这是一个仅用于开发的标志，因为注释在生产中被剥离
  DEV_ROOT_FRAGMENT = 1 << 11,

  // 以下都是一些特殊的flag，它们不能使用位运算进行匹配
  // 表示vnode经过静态提升
  HOISTED = -1,
  // diff算法应该退出优化模式
  BAIL = -2
}
```
