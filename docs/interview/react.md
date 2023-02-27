# react

## 请说一下对 react 的理解

- react 是什么？react 是一个用构架界面的 js 库
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
