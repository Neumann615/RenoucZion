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

## 块级作用域

## const命令

## 顶层对象的属性

## global对象