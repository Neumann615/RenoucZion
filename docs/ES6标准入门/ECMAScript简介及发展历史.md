# ECMAScript简介

## ECMAScript和JavaScript的关系

前者是后者的`规格`，后者是前者的一种`实现`,另外ECMAScript方言还有JScript和ActionScript，在日常场合，这两个词可以互换。

## ES6和ECMAScript2015的关系

ES6是一个历史名词，也是一个泛指，含义是指5.1版本以后的JavaScript的下一代标准，涵盖了ES2015、ES2016、ES2017等，而ES2015则是正式名称，特指当年发布的正式版本的语言标准，此时提到的ES6一般指ES2015标准，但有时也泛指`下一代JavaScript语言`
。

## 语法提案的批准流程

任何人都可以向标准委员会（T39委员会）提案，要求修改语言标准。
一种新的语法从提案到变成正式标准，需要经历五个阶段，每个阶段的变成都要由委员会批准。

- **Stage0:** Strawman(展示阶段)
- **Stage1:** Proposal(征求意见阶段)
- **Stage2:** Draft(草案阶段)
- **Stage3:** Candidate(候选阶段)
- **Stage4:** Finished(定案阶段)

## 发展历史

`ECMAScript`是由网景的布兰登·艾克开发的一种脚本语言的标准化规范；最初命名为`Mocha`，后来改名为`LiveScript`，最后重命名为JavaScript。1995年12月，升阳与网景联合发表了`JavaScript`
。1996年11月，网景公司将JavaScript提交给欧洲计算机制造商协会进行标准化。ECMA-262 的第一个版本于 1997 年 6 月被 Ecma组织采纳。ECMAScript 是由ECMA-262 标准化的脚本语言的名称。
尽管`JavaScript`和`JScript`与`ECMAScript`兼容，但包含超出`ECMAScript`的功能。

| 版本          |        发表日期         | 与前版本的差异 |
|-------------|:-------------------:|:-------:|
| 1           |       1997年6月       |    首版     |
| 2           |       1998年6月       |   格式修正，以使得其形式与ISO/IEC16262国际标准一致      |
| 3           |          1999年12月           |强大的正则表达式，更好的词法作用域链处理，新的控制指令，异常处理，错误定义更加明确，数据输出的格式化及其它改变|
| 4           |     放弃      |由于关于语言的复杂性出现分歧，第4版本被放弃，其中的部分成为了第5版本及Harmony的基础；由ActionScript实现|
| ES5         |     2009年12月      |新增“严格模式（strict mode）”，一个子集用作提供更彻底的错误检查,以避免结构出错。澄清了许多第3版本的模糊规范，并适应了与规范不一致的真实世界实现的行为。增加了部分新功能，如getters及setters，支持JSON以及在对象属性上更完整的反射|
| 5.1         |       2011年6月       |ECMAScript标5.1版形式上完全一致于国际标准ISO/IEC 16262:2011。|
| ES6         |       2015年6月       |ECMAScript 2015（ES2015），第 6 版，最早被称作是 ECMAScript 6（ES6），添加了类和模块的语法，其他特性包括迭代器，Python风格的生成器和生成器表达式，箭头函数，二进制数据，静态类型数组，集合（maps，sets 和 weak maps），promise，reflection 和 proxies。作为最早的 ECMAScript Harmony 版本，也被叫做ES6 Harmony。|
| 7           |      2016年6月       |ECMAScript 2016（ES2016），第 7 版，多个新的概念和语言特性|
| 8           | 2017年6月 |ECMAScript 2017（ES2017），第 8 版，多个新的概念和语言特性|
| 9           | 2018年6月 |ECMAScript 2018 （ES2018），第 9 版，包含了异步循环，生成器，新的正则表达式特性和 rest/spread 语法。|
| 10          |        2019年6月        |ECMAScript 2019 （ES2019），第 10 版|
| 11          |   2020年6月    |ECMAScript 2020 （ES2020），第 11 版|
