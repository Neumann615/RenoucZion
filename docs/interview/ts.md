# typescript

## ts和js的主要区别是什么

   - ts相当于js的增强版 继承了js的全部用法在其基础上增加了自己的一些语法
   - ts在js的基础上增加了静态类型，可以在编译阶段进行类型检查
   - js是一种解释性语言，在运行前无需编译，ts需要经过编译器编译成js，然后在浏览器或node中进行运行

## ts的数据类型有哪些
   - any unknown
   - Object
   - Number String Boolean
   - number string boolean
   - never
   
## 解释ts中的接口（interface）和类型别名（Type Allases）他们有何异同
  - 相同点是都可以描述属性或者方法，都支持用extends关键字进行扩展
  - 不同点是 
    1.类型别名可以声明基本类型，元组，联合类型等，interface不支持
    2.类型别名不会自动合并(不允许重复)，interface可以自动合并
## 什么是泛型？请提供一个泛型的使用实例
  - 泛型，定义一个变量不确定类型的时候，不预先指定类型，在使用的时候再指定具体类型
## ts中的枚举类型是什么？她如何工作
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
    type A = {
        name:string;
        age:string;
    }

    type B = {
        [P in keyof A]:number;
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
 - 首先确认js库中有无声明文件 一般是以@type/来命名的，若没有编可自己创造一个该库的声明文件***.d.ts  declear module 'express' {}


## object Object {} 的区别
 - Object 包含所有类型的集合
 - object非原始类型的一些类型(只支持引用类型)
 -  {} 等同于 new Object()无法对对象进行赋值

## 什么是抽象类
 - 抽象类不能直接被实例化，只能作为其他类的基类来提供方法和属性 用派生类去继承抽象类 需要对抽象类的方法进行一些实现
 - 用abstract关键字来修饰


## 手写一个发布订阅
   ```js
    interface I {
      events: Map<string, Function[]>
      once: (event: string, callback: Function) => void,  //一次
      on: (event: string, callback: Function) => void,    //订阅
      emit: (event: string, ...args: any[]) => void,  //派发
      off: (event: string, callback: Function) => void    //删除
    }

    class Emitter implements I {
    events: Map<string, Function[]>
    constructor() {
        this.events = new Map()
    }
    once(event: string, callback: Function) {
        // 创建一个自定义函数，先通过on触发，触发完之后立马通过off回收掉
        const cb = (...args:any[]) => {
            callback(args)
            this.off(event,cb)
        }
        this.on(event,cb)
    }
    on(event: string, callback: Function) {
        if (this.events.has(event)) {
            const eventList = this.events.get(event);
            eventList && eventList.push(callback)
        }
        else {
            this.events.set(event, [callback])
        }
    }
    emit(event: string, ...args: any[]) {
        console.log(this.events.get(event))
        const events = this.events.get(event)
        if (events){
            events.forEach((fn) => {
                fn(...args)
            })
        }
    }
    off(event: string, callback: Function) {
        const callbackList = this.events.get(event);
        if(callbackList){
            callbackList?.splice(callbackList.indexOf(callback),1)
        }
    }
  }

  const bus = new Emitter();
  bus.on('message', () => {
      console.log('132');
  })

  bus.on('message', () => {
      console.log('456');
  })

  bus.emit('message', false, 1)
  ```


