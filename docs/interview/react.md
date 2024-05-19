# react

## 请说一下对 react 的理解

- react 是什么？react 是一个用来构建界面的 js 库
- 能干什么？通过组件化的方式 构建快速响应的大型 web 应用程序

- 如何干的？声明式渲染

  声明式：告诉程序我们想要什么效果，其他交给程序来做

  命令式：命令我们程序去做什么，程序就会跟着你的命令一步一步执行

```js
// 声明式
let root = document.getElementById("root");
ReactDom.render(
  <h1
    onClick={() => {
      console.log("hello");
    }}
  >
    hello
  </h1>
);

//命令式
let h1 = document.createElement("h1");
h1.innerHTML = "hello";
h1.addEventListener("click", () => {
  console.log("hello");
});
```

组件化：把页面拆分成一个个组件，方便拆分和复用，做到高内聚和低耦合

一次学习随处编写

可以用 react 开发 web，android，ISO，vr 和命令程序

reactNative 使用 react 来创建 Android 和 ios 的原生应用

react360 创建 3d 和 vr 用户交互的框架

优缺点
优点：开发团队强大，一次学习随处编写，api 简洁
缺点：过于灵活，没有系统的解决方案，选型成本高

其他扩展
JSX 实现声明式
虚拟 dom 实现跨平台
react 使用的设计模式，数据结构

## 为什么 react 会引入 jsx

- jsx是React.createElement的语法糖，只要是为了实现声明式，提升可读性。
不想引入新的概念

- 工作原理：抽象语法树，以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构，比如
var ast = "is tree";通过树形结构表示出来，先分词，进行分类

- babel的工作流程
源代码先经过词法分析变成一个token流，经过语法分析变成一个AST语法树，经过转化转成新的语法树重新生成源代码

## react ref的理解，应用场景
- 理解：refs，允许我们访问dom节点或者组件实例

- 使用：1.传入对象，react.createRef()方法创建对象，通过current属性获取对应元素
       2.回调函数，这个函数会传入一个元素电箱，使用时，直接拿到之前保存的元素对象
       3.传入hook，通过useRef的方式船舰，通过current属性获取对应元素

- 场景：一把不推荐用refs来更新组件，会使dom结构暴露，违反组件封装的原则。一般用来对dom元素的焦点控制，内容选择，内容设置，媒体播放
```js
class RefExample extends React.Component{
  constructor(props){
    super(props);
    this.func = this.func.bind(this)
  }
  func(){
    this.dom.style.color = 'green'
  }
  render(){
    return (
      /* 回调函数中的参数为当前绑定的DOM对象，点击触发事件将按键字体颜色改为绿色，就是你头上的那个绿色 */
      <button ref={(dom)=>{this.dom = dom}} onClick={this.func}>Click me!</button>
    )
  }
}
ReactDOM.render(<RefExample/>,document.getElementById('root'))


class RefExample extends React.Component{
  constructor(props){
    super(props);
    this.func = this.func.bind(this)
    // 1、创建ref对象
    this.myRef = React.createRef();
  }
  func(){
    // 3、获取元素并修改属性
    this.myRef.style.color = 'green'
  }
  render(){
    return (
      // 2、将ref对象挂载到dom元素上
      <button ref={this.myRef} onClick={this.func}>Click me!</button>
    )
  }
}
ReactDOM.render(<RefExample/>,document.getElementById('root'))
```

## 受控组件和非受控组件
react能否知道当前的状态修改
- 受控组件：由react空值输入表单元素而改变其值的方式，例如input,textarea,select
- 非受控组件：表单数据由DOM本身处理，不受setState()的控制，例如input输入即显示最新值（使用ref从DOM获取表单值）
```js
  //非受控转换成受控组件
     const App = () => {
      const [value,setValue] = useState('');
      return <input value={value} onInput={event => {setValue(event.target.value)}}/>
     }

```

## react ref

- ref 可以允许用户直接访问DOM元素或者实例

## react为什么要使用hooks

1. 复杂的组件
   1. 将组件中相关的部分可以放在一起 比如对于事件的监听器 需要在两个生命周期中去进行声明和销毁，而在hooks中可以将他们放在同一块

## 错误边界ERROR Boundary

- 组件可以捕获发生在子组件的js报错，并能降级处理
   1. static getDervedStateFromError componentDidCatch

## react的代码分割



## 用户如何通过不同的权限，查看不同的页面

1. js
   1. ajax role -> menuList json展示有权限的
2. react-router
   1. inEnter

```js
  <Router path='/home' component={App} onEnter={(nextState,replace) => {
    if(nextState.location.pathname !== '/'){
      //根据参数判断用户信息
      const uid = utils.getUrlParams(nextState,'uid')
      if (!uid){
        replace('/')
      }
      else{
        //xxx
      }
    }
  }}>
```


## React.createClass 以及extends React.components的区别

React.createClass本质上是一个工厂函数 extends更接近es6中class的写法
1. 语法使用区别:主要体现在方法的定义和静态属性的定义
2. propType 和 getDefaultProps
   1. createClass:propType 和 getDefaultProps去获取和设置对应的props
   2. React.component:propsTypes defaultProps属性去设置
3. 设置state初始的值
   1. createClass:getInitialState()
   2. component：constructor
4. mixin
   1. createClass:mixins 添加属性
   2. component：不可以使用mixin 需安装库

## React事件和html事件的区别
- 事件名称 
  - 原生的事件：全小写
  - react onClick 小驼峰
- 事件函数处理
  - 原生： 字符串
  - react： onclick={}
- 阻止事件本省的默认行为
  - 原生： return false
  - react preventDefault()

react合成事件是模拟原生DOM的行为 
1. 兼容所有浏览器 更好的跨平台
2. react的所有事件存放在一个数组中 避免频繁的新增和删除
3. 方便react统一管理和事务机制


## React中常用的hooks的用法
解决的问题：
- this指向的问题，每次生命函数需要手动的去绑定this，代码不够简洁
- 代码复杂，难以组织，例如componentDidMount和componentWillUnmount写法分散，容易遗漏忘记卸载事件
- 组件之间状态复用困难，类组件中的状态都是通过state定义在组件内部没办法抽离

1. useState：用来解决函数组件中不能定义自己状态的问题,和useState一样是异步执行的，不是立马生效的，若想每次拿到最新的数据使用useEffect
2. useEffect：
若一个函数中定义了多个useEffect，他们的执行顺序是按照代码中的先后顺序来的
```js
useEffect(()=>{
  //组件挂载和更新之后执行的代码
 return () => {} //组件即将被卸载前使用的代码
},[dep1,dep2]);// 依赖数组，若不穿每次渲染都会执行，若传空数组只有第一次会执行
```

3. useLayoutEffect
传递的参数和useEffect完全相同，唯一的区别在于使用useEffect时页面会出现闪烁，应为useEffect是在页面渲染完成之后再去更新数据的，useLayoutEffect没有闪烁，是在页面还没有渲染时就把数据更新了，useLayoutEffect可能会阻塞渲染
4. useMemo:是为了减少组件重新渲染时不必要的函数计算，用作性能优化
传入两个参数，第一个参数为函数，用来进行一些计算，第二个参数是依赖关系，只有在第一个参数发生变化时，才会重新执行计算函数进行计算，如果不穿依赖项，每次组件渲染都会重新进行计算
```js
const memoizedValue = useMemo(() => {return res},[a,b]) //计算逻辑
```
5. useCallback和useMemo相似，useMemo是把值返回，useCallback是把计算函数返回
```js
const memoizedValue = useCallback(() => {desomething(a,b)},[a,b]) //计算逻辑
```

6. React.memo():当父组件发生改变时，默认状态下，他的子组件也会重新渲染，当某些子组件不需要更新时也会强制更新，为了避免这种情况可以使用React.memo()
和类组件中的shouldCompoonentUpdate和PureComponent来避免子组件做不必要的渲染
React.memo和PureComponent类似，但是只适用于函数组件，默认情况下仅对props进行一个浅比较来决定要不要更新，复杂情况下支持自己手写对比的逻辑（如果props的传参是基本数据类型他会自动比较，如果是对象需要手写对比逻辑）
```js
function Demo(props){

}
function compare(preProps,nextProps) {
  //自己手写对比逻辑，返回true更新，false跳过更新
}
export default React.memo(Demo,compare)
```

7. useRef:可以帮助我们获取dom和react组件实例，和类组件中的React.createRef()相似，修改.current的值不会触发组件的重新渲染

8. forwardRef用法，可以在父组件中操作子组件的ref对象，并且将ref对象作为一个参数传递，可以在父组件中去操作子组件的dom元素

```js
// 代码示例
import { useRef, forwardRef } from 'react';

function Child(props, ref) {
    return (
        <input ref={ref} />
    );
}

function Demo() {
    const childRef = useRef();

    const onFocus = () => {
        childRef.current.focus();
    }

    return (
        <div>
            <Child ref={childRef} />
            <button onClick={onFocus}>focus</button>
        </div>
    );
}

Child = forwardRef(Child);

export default Demo;
```
9. useImperativeHandle：在父组件中去使用子组件定义的函数和状态
- 在父组件中使用useRef创建Ref引用变量
- 使用forwardRef将创建的ref引用传递子组件中去
- 将子组件中的函数和状态通过useImperativeHandle挂在到传递的ref对象上
代码示例
```js
// 代码示例
import { forwardRef, useState, useImperativeHandle, useRef } from 'react';

function Child(props, ref) {
    const [count, setCount] = useState(0);

    useImperativeHandle(ref, () => {
        return {
            addCount: () => {
                setCount(count + 1);
            },
            value: 2
        }
    });

    return (
        <div>
            <p>{`count: ${count}`}</p>
        </div>
    );
}

Child = forwardRef(Child);

function Demo() {
    const childRef = useRef();

    return (
        <div>
            <Child ref={childRef} />
            <button onClick={() => {
             	// 调用子组件的addCount方法和获取子组件的value值
                childRef.current.addCount();
                console.log(childRef.current.value);
            }}>add</button>

        </div>
    );
}


export default Demo;
```
10. useContext
全局状态共享
代码示例
```js
import React, { useContext } from 'react'
import UserContext from './context';

// const UserContext = React.createContext();

function Demo() {
	// 如果React.createContext没有指定默认值，也可以在对应子组件上套上UserContext.Provider来指定值
    return (
        // <UserContext.Provider value={{ name: '张三' }}>
            <Child />
        // </UserContext.Provider>
    )
}



function Child() {

    const user = useContext(UserContext);
    return (
        <div>
            <p>{`name: ${user.name}`}</p>
        </div>
    )
}

export default Demo;
```
11. useReducer：实现更复杂的状态管理逻辑
```js
// 代码示例
import React, { useReducer } from 'react'

// 1.需要有一个 reducer 函数，第一个参数为之前的状态，第二个参数为行为信息
function reducer(state, action) {
    switch (action) {
        case 'add':
            return state + 1;
        case 'minus':
            return state - 1;
        default:
            return 0;
    }
}



function Demo() {

    // 2.引入useReducer，第一个参数时上面定义的reducer，第二个参数时初始值
    // 3.返回为一个数组，第一项为状态值，第二项为一个 dispatch 函数，用来修改状态值
    const [count, dispatch] = useReducer(reducer, 0);
    return (
        <div>
            <button onClick={() => { dispatch('add') }} >add</button>
            <button onClick={() => { dispatch('minus') }} >minus</button>
            <button onClick={() => { dispatch('unknown') }} >unknown</button>
            <p>{`count: ${count}`}</p>
        </div>
    );
}
```

## 代码分割
- import
- React.lazy结合suspense

## Fragments
- React.fragments保证函数有唯一的根节点

## Hoc


- 是一个没有副作用的纯函数  入参是一个组件，出参也是一个组件
1. 抽离重复的代码实现组件的复用性
2. 控制渲染流程 权限控制
3. 处理生命周期 检测组件渲染性能的好坏

- 传入一个组件，计算得到组件render期间的耗时
```js

  function withTime(wrapperComponent){
    return class extends wrapperComponent() {
      constructor(props){
        super(props),
        start,
        end,
      }

      componentDidmount(){
        if(super.componentDidmount){
          super.componentDidmount()
        }
        end + = new Date()
        sendLod(start-end)
      }

      componetWillMount(){
        if(super.componetWillMount){
          super.componetWillMount()
        }
        start + = new Date()
      }

      return super.render()
    }
  }
```



## hooks

## 异步组件
- 手写一个异步组件
```js
const OtherComponent = React.lazy(() => import('./OtherComponent'))

const OtherComponent = lazy(new Promise(resolve=>{
  setTimeout(() => {
    resolve:{default:<OtherComponent/>}
  },3000)
}))


// suspense组件
<Suspense fallback={<div>loading</div>}>
<About/>
</Suspense>

class Suspense extends React.Component{
  state = {
    isRender:true
  }
  componentDidCatch(e){
    this.setState({
      isRender:fasle
    })
  }

  render() {
    const {children,fallback} = this.props
    const {isRender} = this.state
    return isRender ? children : fallback
  }
}
```

## react hooks的使用限制

1. 是什么：不要在循环，条件嵌套函数中调用hook，在react的组件中调用hook
2. 设计出初衷：改进react的开发模式
3. 问题领域： 1.组件之间难以复用状态逻辑，以前的方式是高阶组件，renderProps,状态管理2.复杂的组件变得难以理解（生命周期函数与业务逻辑耦合太深，）3.人和机器都容易混淆（this值捕获问题，类属性草案）
4. 方案原理 react中是单链表的形式，通过next按顺序串联所有的hook，将链表中的一个hook与fiber关联，当fiber树更新时，就能从hooks中计算出最终输出的状态和执行相关的副作用。如果在判断逻辑嵌套循环中，就可能导致更新时不能获取到对应的值


高阶组件的缺陷
1. 高阶组件的props都是直接穿透下来，无法确实子组件的props来源
2. 可能会出现props重复导致报错
3. 组件的嵌套层级太深
4. 会导致ref丢失




## useEffect 和 useLayouteffect的区别
- 他们都是用来处理副作用的两个钩子函数，他们之间的区别主要在触发的时机不同
- useEffect会在组件渲染完成后异步执行副作用代码，不会阻塞组件的渲染，会在浏览器绘制完成后才执行，这一位置useEffect中的副作用代码会在页面渲染之后执行，他适合处理不需要立即执行副作用，如事件请求，事件绑定等等
- useLayoutEffect会在组件渲染完成后同步执行副作用代码，他会在浏览器渲染之前执行，可能会阻塞组件的渲染，适合处理需要在页面渲染之前立即执行的副作用，如获取dom元素的尺寸，触发动画等

## useRef的使用场景
原因
1. 持久性，useref的返回对象在组件的整个生命周期中都是持久的，而不是每次渲染都重新创建
2. 不会触发渲染，当useState中的状态改变时，组件会重新渲染，useRef不会
使用场景
1. 访问dom元素
2. 保存状态但是不触发渲染时

## react.memo和useMemo的使用场景

1. usememo是用来缓存计算结果，只有在依赖项发生变化时才能重新计算，可以有效减小不必要的计算开销
2. 当state发生变化时会重新渲染该组件，如果引入子组件，子组件也会重新渲染，react.memo会浅比较当前组件的props与上一次渲染时的props 如果props没有发生变化，则跳过渲染过程，react.memo通过自定义第二个参数，可以拿到前一个和后一个props，从而比较里面的属性值是否发生变化而决定是否重新渲染组件

## react fiber的工作机制，解决了哪些问题

## useState为什么返回数组

## class和hook的区别

作为组件而言类组件和函数组件在使用与呈现上没有任何不同，性能也不会有明显的差异，他们在开发时的心智模型存在巨大的不同，类组件时基于面向对象编程，核心概念是继承和生命周期，函数组建的内核是函数式编程
1. 使用场景：在不适用recompose或者hooks的情况下，如需使用生命周期，就用类组件，限定场景时固定的。在recompose或hookd的加持下类组件与函数组建的能力边界完全相同，都可使用类似生命周期等能力
2. 设计模式：类组件可以实现继承，函数组件缺少继承能力
3. 性能优化：类组件优化依靠shouldComponentUpdate组件去阻断渲染，函数组件靠react.memo去优化
4. 类组件的缺点...


## 自定义hook什么时候用

## hook的闭包链表

## hook的原理






