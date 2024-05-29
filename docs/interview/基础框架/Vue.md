# vue

## vue 中 MVVM 的理解

M：Model（数据模型）：指代表真实状态内容的领域模型（面向对象），或只代表内容的数据访问层（以数据为中心）

V：View（视图）：指与用户交互的页面，UI 相关的东西。

VM:View-Model（视图模型）:管理视图和模型的转换，是两者之间的通信桥梁，一方面实现了数据绑定，将Model的变化实时的反映到视图中，另一方面实现了dom监听，当dom发生一些事件触发时，可以修改需要修改的相关数据。

在MVVM架构下，View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互，Model 和 ViewModel 之间的交互是双向的， 因此View 数据的变化会同步到Model中，而Model
数据的变化也会立即反应到View 上。

## vnode 中的 shapeFlag 和 patchFlag 属性

### shapeFlag

vnode 中的 shapeFlag 属性使用二进制的方式描述组件的类型，shapeFlag 的值类型是一个枚举

```js
enum shapeFlags
{
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

判断某个 vnode 的类型时可以使用 vnode.shapeFlag & ShapeFlags.ELEMENT 的方式进行判断，或判断 vnode 是否同时是多种类型 vnode.shapeFlag &
ShapeFlags.ELEMENT | ShapeFlags.ARRAY_CHILDREN

### patchFlag

patchFlag 是在编译 template 模板时给 vnode 添加的一个标识信息，这个标识信息反映了这个 vnode 在更新时那些部分可能会产生变化，这样在 runtime 时可以根据 patchFlag 准确判断更新，减少
diff 对比次数，提升性能。
patchFlag 的类型和 shapeFlag 相同，都为枚举类型

```js
 enum PatchFlags{
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

## 生命周期

### Vue2

![avatar](/images/vue2-lifecycle.png)

- **beforeCreate**: 组件实例刚被创建，此时还没有初始化数据，无法访问到data、computed、watch、methods等属性和方法。适合做一些初始化设置。
- **created**: 实例创建完成，数据已经初始化完成，可以访问到data、computed等，但DOM尚未生成，可以进行一些数据处理或发起异步请求。
- **beforeMount**: 在挂载之前被调用，render函数即将被执行。可以在这一步对数据进行最后的修改，但不建议操作DOM。
- **mounted**: 实例已挂载到DOM中，el被新创建的vm.$el替换，并且可以访问到真实的DOM元素。适合进行DOM操作或调用第三方库初始化等。
- **beforeUpdate**: 数据变化导致虚拟DOM重新渲染，但在DOM更新之前调用。此时组件的DOM结构尚未改变，可以在此做更新前的准备工作。
- **updated**: 组件DOM已更新，可以访问到最新渲染的DOM。适合执行依赖于DOM更新的操作，但应避免在此修改state，以免触发无限循环更新。
- **beforeDestroy**: 实例销毁之前调用，可以在这做清理工作，如移除事件监听、清理定时器等。
- **destroyed**: 实例已经被销毁，所有子实例和监听器也被清理，此时组件不再可用，一般无需在此处进行额外操作。
- **activated**: 被缓存的组件被重新激活并显示时调用。
- **deactivated**: 缓存的组件失活并隐藏时调用，可以用来执行一些清理工作。
- **errorCaptured**:在捕获一个来自后代组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。

### Vue3

![avatar](/images/vue3-lifecycle.png)

#### 选项式

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeUnmount
- unmounted
- errorCaptured
- renderTracked
- renderTriggered
- activated
- deactivated
- serverPrefetch

#### 组合式

- onMounted
- onUpdated
- onUnmounted
- onBeforeMount
- onBeforeUpdate
- onBeforeUnmount
- onErrorCaptured
- onRenderTracked
- onRenderTriggered
- onActivated
- onDeactivated
- onServerPrefetch

## reactive和ref的区别

### 数据类型处理

- **ref**：主要用于包裹基础数据类型（如字符串、数字、布尔值等），将其转换为响应式对象。使用时，需要通过 .value 来访问和修改数据。例如，const count = ref(0); 访问时使用 count.value。
- **reactive**：适用于对象或数组等复杂数据结构，将其转换为深层次响应式，可以直接通过属性访问，无需.value。例如，const user = reactive({ name: 'Alice', age: 30 });
  直接通过user.name 或 user.age 访问和修改。

### 访问方式

- **ref**：由于它返回的是一个包含单一值的响应式对象，所以需要通过 `.value` 来读取或修改内部的值。
- **reactive**：返回一个代理对象，可以直接访问其属性，使得代码更加自然和简洁，不需要额外的 `.value`。

### 性能和用途

- **ref**：更适合于基础类型数据，或当你想要显式区分某个值是否为响应式时使用。在模板中，`ref` 通常用于单个值的双向绑定。
- **reactive**：更适合于处理复杂对象，尤其是当对象或数组有很多层级嵌套时，它能够自动处理每一层的响应式，简化了数据处理逻辑。在组件的状态管理上更为常用。

### 模板绑定

- 在Vue模板中，`ref`创建的响应式对象需要通过`.value`来绑定，而`reactive`创建的对象可以直接绑定属性。

### 结构

- `reactive` 创建的对象在内部使用Proxy来拦截对象的访问和修改，从而实现响应式。而ref则在内部使用了`reactive`来处理值，外加一层访问逻辑来暴露`.value`。