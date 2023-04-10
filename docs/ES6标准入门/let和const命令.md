# let和const命令

## let命令

### 基本用法

`ES6`新增了`let`命令，用于`声明变量`，其用法类似于var，但是声明的变量只在let命令所在的代码内有效。

```javascript
{
    let a = 10
    var b = 1
}
a // ReferenceError:a is not defined;
b // 1
```

上述代码在代码块中分别用了`let`和`var`命令声明变量，然后在代码块之外调用这两个变量，let声明的报错，var声明的正常，表明let声明的变量只在其所在代码块内有效。

### 不存在变量提升

var命令会发生”变量提升“现象，即变量可以在声明之前使用，值为undefined。按照一般标准来讲，变量应该在声明语句之后才可以使用，为了纠正这种现象，`let`命令改变了语法行为，它所声明的变量一定要在声明后使用，否则便会报错。

```javascript
//var
console.log(foo) //undefined
var foo = 2

//let
console.log(bar) //报错
let bar = 2
```

在以上代码中，变量foo用var命令声明会发生变量提示，即脚本开始运行时，变量foo已经存在，但是没有值，所以会输出undefined。而bar则不会，因此在用到它时变量bar是不存在的，因此会报错。

### 暂时性死区

只要块级作用域内存在let命令，它所声明的变量就绑定在这个区域，不再受外部的影响

```javascript
var tmp = 123;
if (true) {
    tmp = "abc" //报错
    let tmp;
}
```

上面的代码中存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。在代码块中，使用let命令声明变量之前，该变量都是不可用的。
这被称为`暂时性死区`(temporal dead zone,简称TDZ)。

```javascript
if (true) {
    //TDZ开始
    tmp = "wxx"      //报错
    console.log(tmp) //报错

    let tmp; //TDZ结束
    console.log(tmp) // undefined

    tmp = 123
    console.log(tmp) //123
}

//不安全的typeof

typeof x //只要使用该变量就会报错
let x

typeof undefined_value //undefined

```

`ES6`规定暂时性死区和`let`、`const`语句不出现`变量提升`，主要是为了减少`运行时错误`，防止变量生命前就使用该变量，暂时性死区的本质是，只要进入当前作用域，所要使用的变量就已经存在，但是不可获取，只有等到该
变量被声明，才可以获取和使用该变量。

## 块级作用域

## const命令

## 顶层对象的属性

## global对象