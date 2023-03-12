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
- 受控组件：由react空值输入表单元素而改变其值的方式，例如input,textarea,select

- 非受控组件：表单数据由DOM本身处理，不受setState()的控制，例如input输入即显示最新值（使用ref从DOM获取表单值）


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
