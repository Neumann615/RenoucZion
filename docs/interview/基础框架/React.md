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

## react为什么要使用hooks

React 引入 Hooks 的主要原因在于解决类组件开发模式下存在的一些痛点，并提供更高效、灵活的开发方式。以下是使用 Hooks 的几个关键理由：

1. **简化状态逻辑**：在类组件中，状态管理和生命周期方法经常会导致代码结构复杂，难以理解和维护。Hooks 允许在函数组件中直接使用状态（useState）和生命周期替代方法（如useEffect），使得组件更加简洁、易于阅读和测试。

2. **提升代码复用性**：Hooks（如自定义Hooks）使得可以将状态逻辑或副作用逻辑封装成独立的函数，方便在多个组件间共享，而无需通过高阶组件(HOC)或 render props 模式，这大大提高了代码的复用性和模块化程度。

3. **减少样板代码**：类组件中常常需要定义模板化的构造函数、state 初始化、bind 函数等。Hooks 省去了这些繁琐的代码，使得开发者可以更快地专注于业务逻辑。

4. **更好的调试体验**：Hooks 提供了更直观的错误处理和警告信息，当违反Hooks使用规则时，React 能够给出明确的错误提示，帮助开发者迅速定位问题。

5. **促进函数式编程**：Hooks 鼓励使用函数式编程风格，函数组件加上Hooks可以看作纯函数，这对于理解程序行为、利用函数式编程的优势（如组合性和纯函数）非常有利。

6. **性能优化**：通过 useMemo 和 useCallback，开发者可以更细粒度地控制组件的重渲染逻辑，避免不必要的计算和渲染，从而提升应用性能。

7. **与未来的React发展同步**：随着React的演进，官方推荐使用Hooks作为功能开发的主要方式，未来的新特性很可能都是基于Hooks设计的，掌握Hooks有利于跟上技术发展的步伐。

总的来说，Hooks 的引入是为了让React应用的开发变得更加高效、灵活，同时保持代码的可维护性和可读性。它不仅简化了状态逻辑和生命周期的处理，还提升了代码的复用性和整体的开发体验。

## react中hooks和普通函数的区别

在React中，Hooks是一种特殊类型的函数，它们允许你在函数组件中使用state和其他React特性，而不需要编写类组件。下面是Hooks与普通函数的主要区别：

1. **调用环境**：
   Hooks 只能在React函数组件或自定义Hooks内部调用。尝试在普通的JavaScript函数或者类组件中使用Hooks会导致错误。普通函数 没有这种限制，它们可以在任何地方被调用，包括其他普通函数、类方法或模块作用域中。

2. **功能特性**：
   Hooks 提供了访问React状态管理和生命周期特性的能力，如 useState 用于管理组件状态，useEffect 用于处理副作用（如数据获取、订阅或者手动修改DOM），以及 useContext
   用于从上下文中读取值等。普通函数 不具备直接操作React组件状态或生命周期的能力。它们可能用于执行通用逻辑，但不能直接与React的state或生命周期挂钩。

3. **设计目的**：
   Hooks 设计的目的是为了简化组件逻辑，提高代码的可重用性和可维护性。通过Hooks，你可以将组件中的逻辑提取到可复用的函数中，从而避免高阶组件和Render Props等传统技术的复杂性。
   普通函数 设计用于执行特定任务，不特定于React或其组件模型，它们可能服务于各种计算、数据处理或其他通用功能。

4. **命名约定**：
   自定义Hooks 通常以 use 开头命名，这不仅是约定，也有助于开发者识别和理解其用途，并且React DevTools可以识别这样的函数，提供更好的调试体验。尽管不遵循这一命名不会影响运行时行为，但会失去DevTools的支持。
   普通函数 没有这样的命名约定限制，可以根据功能自由命名。

综上所述，Hooks是React框架内的一个概念，专门用于增强函数组件的功能，而普通函数则是编程语言级别的概念，不特定于任何框架或库。

## react中hooks的实现原理

React Hooks 的实现原理主要围绕着几个核心概念，包括函数组件、渲染生命周期、Effect Hook、Reducer Hook、Context API以及Fiber架构。以下是详细的解释：

1. **函数组件与Hooks**: React Hooks 允许在函数组件中使用状态和生命周期特性，而传统上这些特性仅在类组件中可用。Hooks 通过函数调用来“勾住”（hook
   into）React的状态管理系统，从而在不改变组件结构的情况下，增加了功能性。

2. **Hook调用规则**:

- 只能在函数组件或自定义Hook中调用Hooks。
- 在同一个组件的每次渲染中，Hooks的调用顺序必须保持一致。

3. **useState**:
   这是最基础的Hook，用于在函数组件中添加状态。useState内部使用了Fiber节点的memoizedState属性来存储状态值和更新函数。每当useState被调用时，React会在当前组件的Fiber节点上创建或更新一个状态对象。

4. **useEffect**: useEffect Hook
   用于处理副作用，如数据获取、订阅或DOM操作等。React维护了一个Effect列表，并在组件渲染的不同阶段（mount、update、unmount）执行或清理这些副作用。它依赖于Fiber的生命周期阶段来确定何时执行Effect。

5. **Hook调用跟踪**:
   React内部使用了HooksDispatcher来管理Hook的调用。它有三种形态：ContextOnlyDispatcher、HooksDispatcherOnMount和HooksDispatcherOnUpdate，分别对应不同阶段的Hook调用。这确保了Hooks在渲染和更新过程中的正确执行顺序。

6. **Fiber架构**: React 16引入的Fiber架构是Hooks实现的基础。Fiber是一种数据结构，代表了UI的一个可中断的工作单元。每个Fiber节点都关联了与之相关的状态、Effect
   Hook和其他信息。Fiber使得React能够以可中断的方式执行渲染和更新操作，提高了性能和响应性。

7. **链表结构**: React Hooks
   使用链表来存储和管理状态和Effect。每次调用Hook时，都会在当前Fiber的memoizedState上创建一个新的Hook对象，并将其链接到前一个Hook对象，形成了一个Hook调用的历史链表。这样，React在重渲染时可以按顺序恢复每个Hook的状态。

8. **自定义Hooks**: 开发者可以封装自己的Hooks，以复用逻辑。自定义Hooks本质上是函数，可以调用其他Hooks，从而实现复杂功能的模块化和抽象。

综上所述，React Hooks 的实现原理依赖于对函数组件的增强、Hook调用规则的严格遵守、Fiber架构的灵活性以及高效的副作用管理机制。这些设计共同允许React在保持函数式编程简洁性的同时，提供了强大的状态管理和其他高级功能。

## React中常用的hooks的用法

1. **useState**：用来解决函数组件中不能定义自己状态的问题,和useState一样是异步执行的，不是立马生效的，若想每次拿到最新的数据使用useEffect
2. **useEffect**：
   若一个函数中定义了多个useEffect，他们的执行顺序是按照代码中的先后顺序来的

```js
useEffect(() => {
    //组件挂载和更新之后执行的代码
    return () => {
    } //组件即将被卸载前使用的代码
}, [dep1, dep2]);// 依赖数组，若不穿每次渲染都会执行，若传空数组只有第一次会执行
```

3. **useLayoutEffect**:
   传递的参数和useEffect完全相同，唯一的区别在于使用useEffect时页面会出现闪烁，应为useEffect是在页面渲染完成之后再去更新数据的，useLayoutEffect没有闪烁，是在页面还没有渲染时就把数据更新了，useLayoutEffect可能会阻塞渲染
4. **useMemo**:是为了减少组件重新渲染时不必要的函数计算，用作性能优化
   传入两个参数，第一个参数为函数，用来进行一些计算，第二个参数是依赖关系，只有在第一个参数发生变化时，才会重新执行计算函数进行计算，如果不穿依赖项，每次组件渲染都会重新进行计算

```js
const memoizedValue = useMemo(() => {
    return res
}, [a, b]) //计算逻辑
```

5. **useCallback**:

和useMemo相似，useMemo是把值返回，useCallback是把计算函数返回

```js
const memoizedValue = useCallback(() => {
    desomething(a, b)
}, [a, b]) //计算逻辑
```

6. React.memo():当父组件发生改变时，默认状态下，他的子组件也会重新渲染，当某些子组件不需要更新时也会强制更新，为了避免这种情况可以使用React.memo()
   和类组件中的shouldCompoonentUpdate和PureComponent来避免子组件做不必要的渲染
   React.memo和PureComponent类似，但是只适用于函数组件，默认情况下仅对props进行一个浅比较来决定要不要更新，复杂情况下支持自己手写对比的逻辑（如果props的传参是基本数据类型他会自动比较，如果是对象需要手写对比逻辑）

```js
function Demo(props) {

}

function compare(preProps, nextProps) {
    //自己手写对比逻辑，返回true更新，false跳过更新
}

export default React.memo(Demo, compare)
```

7. useRef:可以帮助我们获取dom和react组件实例，和类组件中的React.createRef()相似，修改.current的值不会触发组件的重新渲染

8. forwardRef用法，可以在父组件中操作子组件的ref对象，并且将ref对象作为一个参数传递，可以在父组件中去操作子组件的dom元素

```js
// 代码示例
import {useRef, forwardRef} from 'react';

function Child(props, ref) {
    return (
        <input ref={ref}/>
    );
}

function Demo() {
    const childRef = useRef();

    const onFocus = () => {
        childRef.current.focus();
    }

    return (
        <div>
            <Child ref={childRef}/>
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
import {forwardRef, useState, useImperativeHandle, useRef} from 'react';

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
            <Child ref={childRef}/>
            <button onClick={() => {
                // 调用子组件的addCount方法和获取子组件的value值
                childRef.current.addCount();
                console.log(childRef.current.value);
            }}>add
            </button>

        </div>
    );
}


export default Demo;
```

10. useContext
    全局状态共享
    代码示例

```js
import React, {useContext} from 'react'
import UserContext from './context';

// const UserContext = React.createContext();

function Demo() {
    // 如果React.createContext没有指定默认值，也可以在对应子组件上套上UserContext.Provider来指定值
    return (
        // <UserContext.Provider value={{ name: '张三' }}>
        <Child/>
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
import React, {useReducer} from 'react'

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
            <button onClick={() => {
                dispatch('add')
            }}>add
            </button>
            <button onClick={() => {
                dispatch('minus')
            }}>minus
            </button>
            <button onClick={() => {
                dispatch('unknown')
            }}>unknown
            </button>
            <p>{`count: ${count}`}</p>
        </div>
    );
}
```

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
class RefExample extends React.Component {
    constructor(props) {
        super(props);
        this.func = this.func.bind(this)
    }

    func() {
        this.dom.style.color = 'green'
    }

    render() {
        return (
            /* 回调函数中的参数为当前绑定的DOM对象，点击触发事件将按键字体颜色改为绿色，就是你头上的那个绿色 */
            <button ref={(dom) => {
                this.dom = dom
            }} onClick={this.func}>Click me!</button>
        )
    }
}

ReactDOM.render(<RefExample/>, document.getElementById('root'))


class RefExample extends React.Component {
    constructor(props) {
        super(props);
        this.func = this.func.bind(this)
        // 1、创建ref对象
        this.myRef = React.createRef();
    }

    func() {
        // 3、获取元素并修改属性
        this.myRef.style.color = 'green'
    }

    render() {
        return (
            // 2、将ref对象挂载到dom元素上
            <button ref={this.myRef} onClick={this.func}>Click me!</button>
        )
    }
}

ReactDOM.render(<RefExample/>, document.getElementById('root'))
```

## 受控组件和非受控组件

react能否知道当前的状态修改

- 受控组件：由react空值输入表单元素而改变其值的方式，例如input,textarea,select
- 非受控组件：表单数据由DOM本身处理，不受setState()的控制，例如input输入即显示最新值（使用ref从DOM获取表单值）

```js
  //非受控转换成受控组件
const App = () => {
    const [value, setValue] = useState('');
    return <input value={value} onInput={event => {
        setValue(event.target.value)
    }}/>
}

```

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

## react hooks的使用限制

1. **只能在函数组件中调用**：Hooks 不能在 class 组件中使用，它们是专门为函数组件设计的。如果你想在 class 组件中使用类似的特性，你得继续使用生命周期方法和状态提升等传统方式。

2. **顶级调用**：Hooks 必须在函数组件的最外层调用，不能在循环、条件判断或嵌套函数中调用。这是因为 React 依赖于 Hooks 被调用的顺序来维护其内部状态。如果在条件语句或循环中使用 Hooks，可能会导致 Hook
   被调用的顺序在每次渲染时发生变化，从而使 React 无法正确地追踪状态。

3. **Hook 名称约定**：自定义 Hook 应该始终以 use 开头命名，这不仅是一个最佳实践，也是为了让工具和库能够自动识别它们。例如，useMyCustomHook。

## useEffect 和 useLayoutEffect的区别

`useEffect` 和 `useLayoutEffect` 都是 React 中用于在函数组件中执行副作用操作的 Hooks，但它们的主要区别在于执行时机及其对浏览器渲染流程的影响：

### useEffect

- 执行时机：`useEffect` 会在浏览器完成渲染页面之后异步执行。这意味着它不会阻塞浏览器对页面的绘制，允许用户界面更快地更新，但副作用函数的执行可能会导致界面短暂的不一致状态，因为用户可能看到的是尚未应用副作用结果的界面。
- 用途：通常用于处理可能引起副作用的操作，如数据获取、订阅或者手动改变DOM等，以及执行清理操作，如取消网络请求或移除事件监听器。
- 影响：由于是异步执行，不会阻塞浏览器渲染，因此不会影响UI的流畅性，但可能需要考虑潜在的异步问题。

### useLayoutEffect

- 执行时机：`useLayoutEffect`则在浏览器完成DOM更新之后、同步并且在浏览器绘制之前执行。这意味着它会阻塞浏览器的渲染过程，直到其回调函数执行完毕，确保了副作用在浏览器绘制之前完成，可以用来同步DOM操作和组件的视觉状态。
- 用途：适用于那些需要在渲染结果被提交给浏览器之前进行的 DOM 操作或尺寸测量等场景，以保证没有视觉上的闪烁或不一致。
- 影响：由于同步执行且会阻塞渲染，应当谨慎使用，避免阻塞时间过长导致页面无响应的感觉。

### 总结

选择使用哪个取决于你的具体需求：

- 如果你的副作用操作（如数据获取）可以容忍短暂的UI不一致，并且不需要立刻同步到界面显示中，使用 useEffect 较为合适。
- 如果你希望在界面展示给用户之前确保一切副作用都已经处理完毕，避免任何可能的视觉闪烁或布局跳变，那么应该使用 useLayoutEffect。但需要注意的是，它可能会影响UI的响应速度，特别是在执行时间较长时。

## react fiber的工作机制，解决了哪些问题

React Fiber的工作机制主要针对React 16及以后版本中对渲染和更新流程的改进，它引入了一种全新的任务调度和执行模型，旨在解决几个关键问题，提升用户体验和应用程序性能。以下是React
Fiber解决的主要问题及其工作机制的概述：

### 解决的问题

- **长时间运行任务导致的卡顿**：在React
  15及以前版本中，如果渲染或更新操作耗时较长，会导致页面无响应，影响用户体验。Fiber通过将更新过程拆分为一系列小任务（称为“工作单元”），并在每个任务完成后检查是否有空闲时间来决定是否继续执行下一个任务，从而避免阻塞主线程。

- **不可中断的更新过程**：老版本React的更新过程是一次性执行到底，无法中断。Fiber通过增量渲染实现了更新过程的可中断和恢复，
  这意味着即使在复杂的更新序列中，React也能在必要时（如用户交互）暂停当前工作，处理高优先级任务，然后再回来继续之前的更新。

- **优先级调度**：Fiber允许React根据任务的紧急程度来安排它们的执行顺序。例如，用户交互相关的更新可以被赋予更高的优先级，确保快速响应，而非紧急的更新（如后景数据加载）则可以延后执行。

### 工作机制

- **Fiber节点**：React Fiber的核心是Fiber节点，这是一种数据结构，代表了React组件实例及其相关信息。Fiber节点通过链表相连，形成一棵Fiber树，这使得React能更容易地管理和控制更新流程。

- **工作循环**：React Fiber采用基于任务队列的工作循环，每次循环处理一个工作单元（通常是更新一个Fiber节点），然后检查是否还有时间剩余，有则继续处理下一个工作单元，否则交出控制权。

- **时间切片（Time Slicing）**：通过requestIdleCallback API，React Fiber能够在浏览器的空闲时段执行更新任务，实现时间切片，即使在大量更新的情况下也能保证UI的流畅性。

- **可中断和恢复的调和**：Fiber的调和（reconciliation）过程是可中断的，这意味着React可以决定何时停止当前工作，保存进度，之后再从中断的地方恢复，这对于长列表滚动等场景尤为重要。

综上所述，React Fiber通过其灵活的调度机制和细粒度的任务控制，显著提升了React应用的性能和响应能力，特别是在处理大规模和复杂UI更新时，为用户提供更加流畅的交互体验。

## React中useEffect和useLayoutEffect的区别

在React中，`useEffect`和`useLayoutEffect`都是用于处理副作用（side effects）的Hook，但它们之间存在一些关键差异，主要在于执行时机和对渲染流程的影响：

### 执行时机：

`useEffect`
它在浏览器完成渲染（DOM更新之后）异步执行。这意味着它不会阻塞浏览器渲染页面，允许UI快速更新，然后在更新后执行副作用，如数据获取、订阅或者手动改变DOM等。因此，useEffect的回调函数可能在用户看到最新渲染的UI之后才运行。

`useLayoutEffect`类似于`useEffect`
，但它在DOM更新之后、浏览器尝试绘制之前同步执行。这意味着它会阻塞浏览器渲染新的UI，直到useLayoutEffect中的副作用处理完成。这对于那些需要在渲染新UI之前就进行DOM测量或调整的操作非常有用，确保了UI的变化对用户来说是瞬间且连续的。

### 对页面渲染的影响：

`useEffect`的异步特性使得它不会影响到用户看到页面更新的速度，但它可能导致某些场景下的视觉闪烁或短暂的不一致状态，尤其是在依赖外部状态改变UI时。

`useLayoutEffect`
由于其同步执行的特性，可以防止这种视觉上的不连贯，因为它确保了在实际展示给用户之前，所有的DOM操作和布局调整都已经完成。但是，过度使用或不当使用useLayoutEffect可能会导致页面渲染延迟，影响用户体验。

### 应用场景：

通常情况下，数据获取、设置定时器、清理工作等非布局相关的副作用适合放在`useEffect`中。
而需要在渲染流程中精确控制DOM操作顺序，或者需要确保UI元素的位置、尺寸等信息在渲染前可用的场景，则应该使用`useLayoutEffect`。
简而言之，选择`useEffect`还是`useLayoutEffect`取决于副作用是否对渲染流程的即时性有要求。如果副作用可以异步执行而不影响用户体验，那么`useEffect`
是更好的选择；反之，如果需要在渲染流程中同步处理以避免视觉上的瑕疵，则应使用`useLayoutEffect`。






