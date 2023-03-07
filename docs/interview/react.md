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