# TypeScript

## ts和js的主要区别是什么

TypeScript (TS) 和 JavaScript (JS) 之间的主要区别可以从以下几个关键方面进行总结：

### 类型系统:

- `JavaScript` 是一种动态类型语言，意味着变量的类型在运行时被确定，你可以随时改变变量的类型，这提供了灵活性但也可能引入潜在的类型错误。
- `TypeScript` 引入了静态类型系统，是一种静态类型语言。在编写代码时，你需要声明变量、函数参数和返回值的类型。TypeScript 编译器会在编译阶段检查类型错误，有助于在运行前捕捉到类型不匹配的问题，从而减少运行时错误。

### 编译过程:

- `JavaScript` 代码可以直接在浏览器或 Node.js 环境中执行，无需预编译步骤。
- `TypeScript` 代码在运行前需要经过编译，将其转换为 JavaScript 代码。这个过程由 TypeScript 编译器完成，同时执行类型检查、去除类型注解等静态分析，最终产出可以在任何 JavaScript
  环境中执行的代码。

### 语言特性和扩展性:

- `JavaScript` 是一个相对基础的脚本语言，虽然 ES6 及以后的版本引入了类、模块等特性，但它的功能相比 TypeScript 较为有限。
- `TypeScript` 是 JavaScript 的超集，它不仅包含所有 JavaScript 的特性，还新增了许多功能，比如接口、类型别名、枚举、泛型、命名空间等，这些特性增强了代码的结构和可维护性。

### 开发工具支持:

- `JavaScript` 虽然也能得到现代IDE和编辑器的良好支持，但其动态类型特性限制了编辑器对代码的深入理解，导致自动完成、代码导航等功能可能不够精确。
- `TypeScript` 则因为其静态类型系统，能为IDE和编辑器提供更多上下文信息，从而提供更精准的代码补全、接口提示、重构支持等高级功能，显著提升开发效率和代码质量。

### 学习曲线和兼容性:

- `JavaScript` 学习门槛相对较低，适合快速上手，特别是对于初学者。
- `TypeScript` 因为其类型系统和额外的特性，可能需要一定的学习时间，尤其是对于习惯了动态类型的开发者。但是，由于它是 JS 的超集，任何有效的 JS 代码也是有效的 TS 代码，所以迁移是渐进式的。

### 生态系统:

- `JavaScript` 拥有庞大的生态系统，几乎所有的前端开发和很多后端框架、库都是基于 JS 构建的。
- `TypeScript` 的生态系统虽然起步较晚，但发展迅速，许多流行的框架如 Angular、Vue 和 React 都支持或推荐使用 TypeScript，且TS的使用比例在不断上升。

综上所述，TypeScript 主要在静态类型、编译时检查、增强的代码结构和开发工具支持方面为 JavaScript 带来了改进，特别适合大型项目和团队协作，以提升代码质量和维护性。而 JavaScript
则以其灵活性和广泛兼容性，继续作为前端开发的基础语言。

## ts的数据类型有哪些

- 布尔型 (boolean): 表示逻辑上的 true 或 false 值。
- 数字 (number): 用来表示整数和浮点数，支持二进制、八进制、十进制和十六进制表示。
- 字符串 (string): 用于存储文本数据，可以用单引号 (')、双引号 (") 或模板字符串（反引号 `）定义。
- 数组 (array): 有两种定义方式，可以通过类型后面加方括号表示元素类型，如 `number[]` 表示一个数字数组，或者使用 `Array<元素类型>`，如 `Array<number>`。
- 元组 (tuple): 允许表示一个已知元素数量和类型的数组，每个元素可以有不同的类型，例如 `[string, number, boolean]`。
- 枚举 (enum): 用于定义一组命名的常量，可以是数字或字符串。
- 任意类型 (any): 表示可以是任何类型，通常在类型不明确或需要绕过类型检查时使用，但应谨慎使用以避免类型安全问题。
- void：表示没有任何返回值的函数，或者表示不应当有值的地方。
- null 和 undefined：它们各自都是一个类型，代表空值或未定义的值。
- never：表示永远不会达到的终点，用于标记那些永不会返回的函数。
- 对象 (object): 用于表示非原始类型值，即除了上面列出的基本类型外的所有类型，包括普通对象、函数和类实例等。
- undefined类型: 虽然在 TypeScript 中 undefined 也是一个单独的类型，但它经常与 null 一起被讨论，并且在严格模式下，变量默认不会被赋予 undefined 值。

此外，TypeScript 还支持高级类型，如联合类型 (union types)、交叉类型 (intersection types)、类型别名 (type aliases)、接口 (interfaces)、类 (classes)、泛型 (
generics) 等，这些类型构造允许创建更复杂和精确的类型表达。

## 解释ts中的接口（interface）和类型别名（Type Aliases）他们有何异同

在 TypeScript 中，接口（Interface）和类型别名（Type Aliases）都是定义和管理类型的方式，但它们的设计意图和应用场景有所差异。

### 接口（Interface）

接口主要用于定义对象的形状（shape），即描述对象应该具有哪些属性和方法以及它们的类型。接口可以被类实现，也可以用来描述函数的类型。接口支持组合（通过 extends 关键字）和实现继承，但不支持多重继承。

```typescript

interface User {
    id: number;
    name: string;
    email: string;
}

class Admin implements User {
    id: number;
    name: string;
    email: string;
    role: 'admin';

    constructor(id: number, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = 'admin';
    }
}
```

### 类型别名（Type Aliases）

类型别名则是为现有的类型提供一个新的名字，它更加灵活，不仅可以用于对象类型，还可以用于基本类型、联合类型、元组类型、函数类型等复杂类型结构。类型别名不支持接口那样的结构扩展或实现继承，但可以用于简化复杂的类型表达式。

```typescript
type UserID = number;
type UserName = string;
type UserEmail = string;

type User = {
    id: UserID;
    name: UserName;
    email: UserEmail;
};

function logUser(user: User) {
    console.log(`ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`);
}
```

### 异同总结

相同点：

1. 都用于定义类型，增加了代码的可读性和类型安全。
2. 可以用来描述对象的结构，包括属性和方法的类型。

不同点：

1. 结构和行为定义：接口更倾向于定义对象的结构和行为规范，支持类的实现；类型别名则是为现有类型提供一个别名，不涉及结构或行为的约束。
2. 扩展性：接口支持通过 extends 关键字扩展其他接口，实现接口的组合；类型别名不支持直接扩展，但可以通过交叉类型（&）间接实现类似功能。
3. 应用场景：接口常见于面向对象设计，定义类的结构和方法；类型别名则更适用于复杂类型或泛型的简化表达，提升代码的可读性。
4. 类型系统参与度：接口在编译时会被检查并可能影响编译结果（如生成的代码结构），类型别名在编译后的代码中通常不会留下痕迹，仅用于开发阶段的类型检查。

## 什么是泛型？请提供一个泛型的使用实例

定义一个变量不确定类型的时候，不预先指定类型，在使用的时候再指定具体类型,称为类型占位符。

```typescript
function swapValues<T>(a: T, b: T): [T, T] {
    return [b, a];
}

// 使用示例
let x = 10;
let y = 20;
[x, y] = swapValues(x, y);
console.log(x, y); // 输出: 20 10

let first = "Hello";
let second = "World";
[first, second] = swapValues(first, second);
console.log(first, second); // 输出: World Hello
```

## ts中的枚举类型是什么？是如何工作的

- 定义一组相关的常量

## 如何在ts中使用模块（Module）和命名空间（namespace）

- 命名空间：内部模块，主要用于组织代码，避免命名冲突
- 模块：侧重于代码的复用，一个模块里面可以有多个命名空间

## 解释ts中的高级类型 如联合类型（Union Types），交叉类型，和索引类型（indexed Types）

- 联合类型：一个变量的类型可能是多种不同类型的组合
- 交叉类型：把多个类型合并成一个类型类似于extends
- 索引类型：用索引名属性方法来描述类型，一般用在无法确定对象中有那些属性

## 解释ts中的映射类型（Mapped Types）提供一个示例

- 将一种类型按照映射规则，转换成另一种类型

  ```js
    type

A = {
name: string;
age: string;
}

type
B = {
[P in keyof A
]:
number;
}

  ```

## ts的类型系统是如何工作的？解释其类型推断机制

## 什么是条件类型 在ts中如何使用它们

- 就是在类型中添加分支 条件使其满足更多使用场景
  ```js
   type Condition<T> = T extends Fish ? Water : Sky

  ```

## 在ts中如何使用类型守卫（type guards）

- 在运行时检查类型的机制，在代码中执行特定的检查以确定变量的类型
- 可用typeof instanceof进行类型收缩

## 解释ts编译过程中的逐步类型检查和擦除

## ts如何与现有的js库一起使用？讨论声明文件（d.ts）的作用

- 首先确认js库中有无声明文件 一般是以@type/来命名的，若没有编可自己创造一个该库的声明文件***.d.ts declear module 'express' {}

## object Object {} 的区别

- Object 包含所有类型的集合
- object非原始类型的一些类型(只支持引用类型)
- {} 等同于 new Object()无法对对象进行赋值

## 什么是抽象类

- 抽象类不能直接被实例化，只能作为其他类的基类来提供方法和属性 用派生类去继承抽象类 需要对抽象类的方法进行一些实现
- 用abstract关键字来修饰


