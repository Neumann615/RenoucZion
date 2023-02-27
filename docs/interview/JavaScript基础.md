# JavaScript 基础

## 数据类型

值类型(基本类型)：字符串（String）、数字(Number)、布尔(Boolean)、空（Null）、未定义（Undefined）、Symbol。

引用数据类型（对象类型）：对象(Object)、数组(Array)、函数(Function)，还有两个特殊的对象：正则（RegExp）和日期（Date）。

## 变量和函数的提升

JavaScript 的运行阶段分为预编译阶段和执行阶段，今天要讨论的变量声明提升和函数声明提升，就是在这个阶段完成的。
在预编译阶段，JS 引擎会做一件事情，那就是读取变量的定义并确定其作用域即生效范围。
变量定义:
使用 var 关键字定义的变量，并未赋值的情况下，该变量的值是 undefined
变量作用域:
全局变量的作用域遍布全局
局部变量的作用域仅在于函数内部
函数内部的同名变量或参数其优先级高于全局同名变量

### 变量声明提升

```js
var name = "ryan";

function say() {
  console.log(name); //输出：undefined
  var name = "zoe";
  console.log(name); //输出：'zoe'
}

say();
```

解析：上述代码从结果看，say 函数执行第一次打印 name 时，并未打印全局的 name('ryan')，而是打印局部的 name（undefined），这是因为在预编译阶段，say 函数内部进行了变量声明提升，提升后的执行效果如下：

```js
var name = "ryan";

function say() {
  var name; //变量name声明提升至作用域顶部，但未赋值，故为undefined
  console.log(name); //存在局部name，则无视全局name
  name = "zoe"; //变量赋值保持原位
  console.log(name); //输出：'zoe'
}

say();
```

### 函数声明提升

函数的两种创建方式： 1.函数声明 2.函数表达式

函数声明:

```js
say(); //输出：'saying'

function say() {
  console.log("saying");
}
```

函数表达式：

```js
say(); //报错：say is not a function

var say = function () {
  console.log("saying");
};
```

解析：同样地先执行函数，后创建函数，结果却是不一样。原因在于，通过函数声明的方式，该函数声明（包括定义）会被提升至作用域的顶部，而表达式的创建方式则只提升了变量 say 至作用域的顶部，此时的 say 其值为 undefined，调用 say()自然报错“say 不是一个方法”。

另一个例子：

```js
var say = function () {
  console.log("1");
};

function say() {
  console.log("2");
}

say(); //输出：'1'
```

解析：预编译阶段进行变量声明提升和函数声明提升后，上述代码执行效果等于：

```js
console.log(say); //输出：[Function: say]

function say() {
  console.log("1");
}

var say = "2";

console.log(say); //输出'2'
```

总结：函数声明提升，会将函数的声明和定义全都提升至作用域顶部。
变量声明提升，只提升声明部分（未赋值状态），赋值部分保持原位置不动。

### 变量声明和函数声明提升的优先级

函数声明提升的优先级要高于变量声明提升，先看一个简单示例：

```js
console.log(say); //输出：[Function: say]

function say() {
  console.log("1");
}

var say = "2";

console.log(say); //输出'2'
```

解析：本例中声明的函数和变量同名都是 say，且函数声明在先，变量声明在后，按理说第一次打印 say 值预期会是 undefined，然而结果是[Function: say]。

预编译阶段进行变量声明提升和函数声明提升后，上述代码执行效果等同于：

```js
var say = function () {
  //函数声明（包括定义）提升
  console.log("1");
};

var say; //只是声明，并不会覆盖say的值

console.log(say); //故输出：[Function: say]

say = "2"; //此时say会被覆盖

console.log(say); //输出'2'
```

总结：同名情况下，函数声明提升优先级要高于变量声明提升，且提升后该函数声明定义不会被提升后的同名变量声明所覆盖，但是会被后续顺序执行的同名变量赋值所覆盖。

## 闭包及其相关作用

什么是闭包:
闭包是一个存在内部函数的引用关系。
该引用指向的是外部函数的局部变量对象(前提是内部函数使用了外部函数的局部变量)

闭包的作用：
延长外部函数变量对象的生命周期
使用闭包能够间接的从函数外部访问函数内部的私有变量

闭包的坏处：可能会引起内存泄漏

例子：防抖，节流，react 中的 hooks

## this 指向

this 是 Javascript 语言的一个关键字，它代表函数运行时,自动生成的一个内部对象，只能在函数内部使用，随着函数使用场合的不同，this 的值会发生变化，但是有一个总的原则，那就是 this 指的是调用函数的那个对象。
总结：谁调用了这个函数，this 指向谁(对象)

### 全局范围

全局范围的 this 默认指向 window 对象
严格模式下指向 undefined

```js
function a() {
  console.log(this);
}
a(); // window
```

### 对象的构造函数

对象的构造函数内部的 this，指向这个实例

```js
function Human(age) {
  this.age = age;
  console.log(this);
}
let greg = new Human(22); //Human{age:22}
let thomas = new Human(24); //Human{age:24}
```

### 对象的方法

this 在对象的方法内指向对象本身，使用这一特性通过方法获取对象的实例

```js
function Human(name) {
  return {
    name,
    getName() {
      return this.name;
    },
    getMe() {
      return this;
    },
  };
}

const wxx = new Human("wxx");
const zym = new Human("zym");

console.log(wxx.getName()); // wxx
console.log(zym.getMe()); // {name:"zym",getName:f,getMe:f}
```

### 箭头函数

箭头函数没有自己的 this，它的 this 是继承而来，默认指向在定义它时所处的对象(宿主对象),所以箭头函数的 this 指向是在被定义的时候就确定了，因此无法改变

```js
var c = 21; //声明同一个全局变量 c 为21
const obj = {
  c: 42,
  x: () => console.log(this.c),
  k: function () {
    console.log(this.c);
  },
};
obj.x(); //箭头函数中的 this指向父级作用域中声明的变量 c，即为21
obj.k(); //obj调用函数 k，函数 k中的 this指向 obj中声明的变量 c，即为 42
```

### 例子

```js
var length = 1;
function fn() {
  console.log(this.length);
}
var obj = {
  length: 100,
  action: function (callback) {
    callback(); // 1(fn无调用者)
    arguments[0](); // 5(调用者是arguments，arguments的长度是5)
  },
};
var arr = [1, 2, 3, 4];
obj.action(fn, ...arr);
```

### 事件

在 html 事件句柄中，this 指向的是触发该事件的 html 元素对象，即事件源

```js
let button = document.createElement("button");
button.innerText = "点我试试";
button.onclick = function () {
  this.innerText = "按钮";
  console.log(this); //<button>按钮</button>
};
document.body.append(button);
```

## call、apply、bind

| 方法  |                                          区别                                          |
| ----- | :------------------------------------------------------------------------------------: |
| call  |                     既可以调用函数又可以传参数，参数只需用逗号隔开                     |
| apply |                 既可以调用函数又可以传参数，参数需要用一个数组进行包裹                 |
| bind  | 不可以调用函数，可以传参数，参数只需用逗号隔开，返回得到一个新的函数，执行需要再次调用 |

::: code-group

```js [call.js]
function fn(name, age) {
  this.name = name;
  this.age = age;
  console.log(this);
}
const obj = {};
fn.call(obj, "zym", 666); //函数fn中的this指向空对象obj并具备name和age属性
```

```js [apply.js]
function fn(name, age) {
  this.name = name;
  this.age = age;
  console.log(this);
}
const obj = {};
fn.apply(obj, ["zym", 666]); //函数fn中的this指向空对象obj并具备name和age属性
```

```js [bind.js]
function fn(name, age) {
  this.name = name;
  this.age = age;
  console.log(this);
}
const obj = {};
//函数被借用时，不会立即执行，而是返回一个新的函数
//所以需要自己手动调用新的函数来改变this指向
const newFn = fn.bind(obj, "zym", 666); //this指向空对象obj并具备name和age属性
newFn();
```

:::

## 事件模型

- W3C 中定义事件的发生经历三个阶段：捕获阶段（capturing）、目标阶段（targetin）、冒泡阶段（bubbling）
- 冒泡型事件：当你使用事件冒泡时，子级元素先触发，父级元素后触发
- 捕获型事件：当你使用事件捕获时，父级元素先触发，子级元素后触发
- DOM 事件流：同时支持两种事件模型，捕获型事件和冒泡型事件
- 阻止冒泡：在 W3c 中，使用 stopPropagation()方法；在 IE 下设置 cancelBubble = true
- 阻止捕获：阻止事件的默认行为，例如点击 a 标签后的跳转。在 W3c 中，使用 preventDefault()方法，在 IE 下设置 window.event.returnValue = false

## 事件委托

事件代理（也称事件委托）事件代理，俗地来讲，就是把⼀个元素响应事件 （ click 、 keydown ......）的函数委托到另⼀个元素 前⾯讲到，事件流的都会经过三个阶段： 捕获阶段 -> ⽬标阶段 -> 冒泡阶段，⽽事件委托就是在冒泡阶段完成
事件委托 会把⼀个或者⼀组元素的事件委托到它的⽗层或者更外层元素上，真正绑定事件的是外层元 素，⽽不是⽬标元素 当事件响应到⽬标元素上时，会通过事件冒泡机制从⽽触发它的外层元素的绑定事件上，然后在外层元素上去执⾏函数

### 应用场景

如果我们有⼀个列表，列表之中有⼤量的列表项，我们需要在点击列表项的时候响应⼀个事件,如果给每个列表项⼀⼀都绑定⼀个函数，那对于内存消耗是⾮常⼤的,这时候就可以事件委托，把点击事件绑定在⽗级元素 ul 上⾯，然后执⾏事件的时候再去匹配⽬标元素。

::: code-group

```html [list.html]
<ul id="list">
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
  <li>item n</li>
</ul>
```

```js [list复杂.js]
// 获取⽬标元素
const lis = document.getElementsByTagName("li");
// 循环遍历绑定事件
for (let i = 0; i < lis.length; i++) {
  lis[i].onclick = function (e) {
    console.log(e.target.innerHTML);
  };
}
```

```js [list简单.js]
// 给⽗层元素绑定事件
document.getElementById("list").addEventListener("click", function (e) {
  // 兼容性处理
  var event = e || window.event;
  var target = event.target || event.srcElement;
  // 判断是否匹配⽬标元素
  if (target.nodeName.toLocaleLowerCase === "li") {
    console.log("the content is: ", target.innerHTML);
  }
});
```

:::

还有⼀种场景是上述列表项并不多，我们给每个列表项都绑定了事件，但是如果⽤户能够随时动态的增加或者去除列表项元素，那么在每⼀次改变的时候都需要重新给新增的 元素绑定事件，给即将删去的元素解绑事件，如果⽤了事件委托就没有这种麻烦了，因为事件是绑定在⽗层的，和⽬标元素的增减是没有关系的，执⾏到⽬标元素是在真正响应执⾏事件函数的过程中去匹配的，可以看到，使⽤事件委托，在动态绑定事件的情况下是可以减少很多重复⼯作的。

::: code-group

```html [list.html]
<input type="button" name="" id="btn" value="添加" />
<ul id="ul1">
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
  <li>item 4</li>
</ul>
```

```js [list事件委托.js]
const oBtn = document.getElementById("btn");
const oUl = document.getElementById("ul1");
const num = 4;
//事件委托，添加的⼦元素也有事件
oUl.onclick = function (ev) {
  ev = ev || window.event;
  const target = ev.target || ev.srcElement;
  if (target.nodeName.toLowerCase() == "li") {
    console.log("the content is: ", target.innerHTML);
  }
};
//添加新节点
oBtn.onclick = function () {
  num++;
  const oLi = document.createElement("li");
  oLi.innerHTML = `item ${num}`;
  oUl.appendChild(oLi);
};
```

### 总结

适合事件委托的事件有： click ， mousedown ， mouseup ， keydown ， keyup ， keypress 从上⾯应⽤场景中，我们就可以看到使⽤事件委托存在两⼤优点：

- 减少整个⻚⾯所需的内存，提升整体性能
- 动态绑定，减少重复⼯作

但是使⽤事件委托也是存在局限性：

- focus 、 blur 这些事件没有事件冒泡机制，所以⽆法进⾏委托绑定事件
- mousemove 、 mouseout 这样的事件，虽然有事件冒泡，但是只能不断通过位置去计算定位， 对性能消耗⾼，因此也是不适合于事件委托的

:::

## new 操作符

创建一个给定构造函数的实例对象

### 特性

- 通过构造函数 Person 创建出来的实例可以访问到构造函数中的属性
- 通过构造函数 Person 创建出来的实例可以访问到构造函数原型链中的属性（即实例与构造函数通过原型链连接了起来）

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.sayName = function () {
  console.log(this.name);
};
const person1 = new Person("zym", 22);
console.log(person1); // Person {name: "zym", age: 22}
person1.sayName(); // 'zym'
```

- 构造函数如果返回值为一个对象，那么这个返回值会被正常使用

```js
function Test1(name) {
  this.name = name;
  return 1;
}
function Test2(name) {
  this.name = name;
  return {
    age: 22,
  };
}
const test1 = new Test1("xxx");
const test2 = new Test2("wxx");
console.log(test1); // 'xxx'
console.log(test2); // 'xxx'
```

### 工作流程

- 创建一个新的对象 obj
- 将对象与构建函数通过原型链连接起来
- 将构建函数中的 this 绑定到新建的对象 obj 上(改变 this 指向，修改上下文)
- 根据构建函数返回类型作判断，如果是原始值则被忽略，如果是返回对象，需要正常处理

### 手动实现

```js
function myNew(Func, ...args) {
  // 1.创建一个新对象
  const obj = {};
  // 2.新对象原型指向构造函数原型对象
  obj.__proto__ = Func.prototype;
  // 3.将构建函数的this指向新对象
  let result = Func.apply(obj, args);
  // 4.根据返回值判断
  return result instanceof Object ? result : obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.sayName = function () {
  console.log(this.name);
};
const person1 = myNew(Person, "zym", 22);
console.log(person1); // Person {name: "zym", age: 22}
person1.sayName(); // 'zym'
```

## 堆和栈

- 内存操作场景下，堆与栈表示两种内存的管理方式
- 数据结构场景下，堆与栈表示两种常用的数据结构

### 内存操作场景

stack 是有结构的，每个区块一定次序存放，可以明确知道每个区块的大小，heap 是没有结构的，数据可以任意存放，因此 stack 的寻址速度要快于 heap，一般来说，内存泄漏都发生在 heap，即某些内存空间不再被使用了，却因为一些其他原因没有被系统回收，栈由操作系统自动分配和释放，比如基本数据类型和函数的参数值等。堆由开发人员自主分配和释放，若不主动释放，程序结束时由浏览器回收，用于存储引用数据类型。而区分栈内存与堆内存的主要原因是因为垃圾回收机制，为了使程序运行时占用的内存最小，当一个方法执行时，每个方法都会建立自己的内存栈，在这个方法内定义的变量将会逐个放入这块栈内存里，随着方法的执行结束，这个方法的内存栈也将自然销毁了。因此，所有在方法中定义的变量都是放在栈内存中的；当我们在程序中创建一个对象时，这个对象将被保存到运行时数据区中，以便反复利用（因为对象的创建成本通常较大），这个运行时数据区就是堆内存。堆内存中的对象不会随方法的结束而销毁，即使方法结束后，这个对象还可能被另一个引用变量所引用（方法的参数传递时很常见），则这个对象依然不会被销毁，只有当一个对象没有任何引用变量引用它时，系统的垃圾回收机制才会在核实的时候回收它。

### 数据结构场景

JavaScript 存在栈和队列概念，通过数组的方式，模仿实现堆栈

- 栈是一种运算受限的线性表，其限制是指只仅允许在表的一端进行插入和删除操作，这一端被称为栈顶（Top），相对地，把另一端称为栈底（Bottom）。把新元素放到栈顶元素的上面，使之成为新的栈顶元素称作进栈、入栈或压栈（Push）；把栈顶元素删除，使其相邻的元素成为新的栈顶元素称作出栈或退栈（Pop）。通过数组的 push()、pop()方法实现栈。

```js
push：在最顶层加入数据。
pop：返回并移除最顶层的数据。
top：返回最顶层数据的值，但不移除它。
isempty：返回一个布尔值，表示当前stack是否为空栈。
```

- 堆其实是一种优先队列，也就是说队列中存在优先级，比如队列中有很多待执行任务，执行时会根据优先级找优先度最高的先执行,堆的特点是"无序"的 key-value"键值对"存储方式,堆的存取方式跟顺序没有关系，不局限出入口。

### 堆栈溢出

- 如果想要堆溢出，比较简单，可以循环创建对象或大的对象；

- 如果想要栈溢出，可以递归调用方法，这样随着栈深度的增加，JVM （虚拟机）维持着一条长长的方法调用轨迹，直到内存不够分配，产生栈溢出。

### 总结

- 运行程序的时候，每个线程分配一个栈，每个进程分配一个堆，也就是说，stack 是线程独占的，heap 是线程共用的。此外，stack 创建的时候，大小是确定的，数据超过这个大小，就发生 stack overflow 错误，而 heap 的大小是不确定的，需要的话可以不断增加。

- 栈存放基本类型的变量、函数、对象变量指针，堆存放对象

- 放在栈里面的变量，只要值一样就可以全等，栈占内存较小，会自动释放值，值为 null,放在堆里面的变量，值相等（应为会默认转成相同数据类型进行对比），全等=会比较是否引用一个数据故不等，不会自动释放值

- 基本数据类型，在当前环境执行结束时销毁，而引用类型只有在引用的它的变量不在时，会被垃圾回收机制回收

|    结构    |                                                                                                                                                                                                    优点                                                                                                                                                                                                    |                                       缺点                                       |
| :--------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------: |
| 栈 (stack) | 栈中的内容是操作系统自动创建、自动回收，占据固定大小的空间，因此内存可以及时得到回收，相对于堆来说，更加容易管理内存空间。相比于堆来说存取速度会快，并且栈内存中的数据是可以共享的，例如同时声明了 var a = 1 和 var b =1，会先处理 a，然后在栈中查找有没有值为 1 的地址，如果没有就开辟一个值为 1 的地址，然后 a 指向这个地址，当处理 b 时，因为值为 1 的地址已经开辟好了，所以 b 也会同样指向同一个地址。 |    相比于堆来说的缺点是，存在栈中的数据大小与生存期必须是确定的，缺乏灵活性。    |
| 堆 (heap)  |                                                                                                                     堆是操作系统动态分配的大小不定的内存，因此方便存储和开辟内存空间。堆中保存的对象不会自动释放，一般由程序员分配释放，也可由垃圾回收机制回收，因此生存周期比较灵活。                                                                                                                     | 相比于栈来说的缺点是，存在堆中的数据大小与生存期是不确定的，比较混乱，杂乱无章。 |

## 垃圾回收机制

JavaScript 堆不需要程序代码来显示地释放，因为堆是由自动的垃圾回收来负责的，每种浏览器中的 JavaScript 解释引擎有不同的自动回收方式，但一个最基本的原则是：如果栈中不存在对堆中某个对象的引用，那么就认为该对象已经不再需要，在垃圾回收时就会清除该对象占用的内存空间。因此，在不需要时应该将对对象的引用释放掉，以利于垃圾回收，这样就可以提高程序的性能。释放对对象的引用最常用的方法就是为其赋值为 null。垃圾回收方面，栈内存变量基本上用完就回收了，而堆内存中的变量因为存在很多不确定的引用，只有当所有调用的变量全部销毁之后才能回收。

- 局部环境中，函数执行完成后，函数局部环境声明的变量不再需要时，就会被垃圾回收销毁（理想的情况下，闭包会阻止这一过程）。

- 全局环境只有页面退出时才会出栈，解除变量引用。所以开发者应尽量避免在全局环境中创建全局变量，如需使用，也要在不需要时手动标记清除，将其内存释放掉。

垃圾回收机制需要跟踪标记变量，并判定是否使用。如何标记未使用的变量也许有不同的实现方式。但是在浏览器里面的话有两种常用的方式：标记清理和引用计数。

### 标记清理

垃圾回收程序运行的时候，会标记内存中存储的所有变量。然后，它会将所有在上下文中的变量，以及被在上下文中的变量引用的变量的标记去掉。在此之后再被加上标记的变量就是待删除的了，原因是任何在上下文中的变量都访问不到它们了。随后垃圾回收程序做一次内存清理，销毁带标记的所有值并收回它们的内存。

### 引用计数

思路是对每个值都记录它被引用的次数。声明变量并给它赋一个引用值时，这个值的引用数为 1。如果同一个值又被赋给另一个变量，那么引用数加 1。类似地，如果保存对该值引用的变量被其他 值给覆盖了，那么引用数减 1。当一个值的引用数为 0 时，就说明没办 法再访问到这个值了，因此可以安全地收回其内存了。垃圾回收程序 下次运行的时候就会释放引用数为 0 的值的内存。该方法无法解决循环引用问题。如：A 引用 B，同时 B 引用 A，相互应用。会导致内存泄漏。

### 总结

- 离开作用域的值会被自动标记为可回收，然后在垃圾回收期间被删除。

- 主流的垃圾回收算法是标记清理，即先给当前不使用的值加上标记，再回来回收它们的内存。

- 引用计数是另一种垃圾回收策略，需要记录值被引用了多少次。

- 引用计数在代码中存在循环引用时会出现问题。

- 解除变量的引用不仅可以消除循环引用，而且对垃圾回收也有帮助。

- 为促进内存回收，全局对象、全局对象的属性和循环引用都应该在不需要时解除引用

## 原型和原型链

- 原型链是什么？

  对象共享属性和共享方法

- 谁拥有原型？

  函数拥有：prototype

  对象拥有：**proto**

- 对象查找属性或方法的顺序

  现在对象本身查找 --> 到构造函数上查找 --> 构造函数的原型中查找 --> 当前原型的原型中查找

- 原型链是什么？

  就是把原型串联起来，原型链的最顶端是 null

  ```js
  class Student {
    constructor(name, score) {
      (this.name = name), (this.score = score);
    }
    eat() {
      console.log("eat");
    }
  }

  const student = new Student();
  console.log(student.__proto === Student.prototype); //指向同一个对象，对象的隐试原型等于构造这个类的显示原型
  ```

## js 中的几种集成方法

- 原型链继承

  优点：父类方法可以复用

  缺点：

       1.父类所有引用类型数据（对象，数组）会被子类共享，更改一个子类的数据其他数据会一起变化

       2.子类实例不能给父类实例传参

```js
function Person(name) {
  (this.name = "小花"),
    (this.eat = ["苹果"]),
    (this.getName = function () {
      console.log(this.name);
    });
}
Person.prototype.get = () => {
  console.log("Person原型上的方法");
};
function student() {}

student.prototype = new Person();

const stu1 = new student();
stu1.name = "小明";
stu1.eat.push("香蕉");

console.log(stu1.name); // 小明
console.log(stu1.eat); // ['苹果','香蕉']

const stu2 = new Person();
console.log(stu2.name); // 小花
console.log(stu2.eat); // ['苹果','香蕉']
```

- 构造函数继承

  优点：父类引用类型数据会被子类共享，不会相互影响

  缺点：子类不能访问父类原型属性上的方法和参数

```js
function Person(name) {
  (this.name = "小花"),
    (this.eat = ["苹果"]),
    (this.getName = function () {
      console.log(this.name);
    });
}
Person.prototype.get = () => {
  console.log("Person原型上的方法");
};
function student() {
  Person.call(this);
}

const stu1 = new student();
stu1.name = "小明";
stu1.eat.push("香蕉");

console.log(stu1.name); // 小明
console.log(stu1.eat); // ['苹果','香蕉']

const stu2 = new Person();
console.log(stu2.name); // 小花
console.log(stu2.eat); // ['苹果']
```

- 组合继承

  优点：父类可以复用，且不会共享

  缺点：会调用两次父类的构造函数，会有两份一样的属性和方法，会影响性能

```js
function Person(name) {
  (this.name = "小花"),
    (this.eat = ["苹果"]),
    (this.getName = function () {
      console.log(this.name);
    });
}
Person.prototype.get = () => {
  console.log("Person原型上的方法");
};
function student() {
  Person.call(this);
}

student.prototype = new Person();

const stu1 = new student();
stu1.name = "小明";
stu1.eat.push("香蕉");

console.log(stu1.name); // 小明
console.log(stu1.eat); // ['苹果','香蕉']

const stu2 = new Person();
console.log(stu2.name); // 小花
console.log(stu2.eat); // ['苹果']
```

- 寄生继承

  ```js
  function Person(name) {
    (this.name = "小花"),
      (this.eat = ["苹果"]),
      (this.getName = function () {
        console.log(this.name);
      });
  }
  Person.prototype.get = () => {
    console.log("Person原型上的方法");
  };
  function student() {
    Person.call(this);
  }

  const Fn = function () {
    Fn.prototype = Person.prototype;
  };

  student.prototype = new Fn();

  const stu1 = new student();
  stu1.name = "小明";
  stu1.eat.push("香蕉");

  console.log(stu1.name); // 小明
  console.log(stu1.eat); // ['苹果','香蕉']

  const stu2 = new Person();
  console.log(stu2.name); // 小花
  console.log(stu2.eat); // ['苹果']
  ```

```

```
