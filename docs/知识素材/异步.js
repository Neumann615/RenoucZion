function a(data) {
    console.log("a函数接受的参数", data)
    console.log("a函数开始")
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("a函数完成")
            resolve("我是a的调用结果")
        }, 1000)
    })
}

function b(data) {
    console.log("b函数接受的参数", data)
    console.log("b函数开始")
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("b函数完成")
            resolve("我是b的调用结果")
        }, 3000)
    })
}

function c(data) {
    console.log("c函数接受的参数", data)
    console.log("c函数开始")
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("c函数完成")
            resolve("我是c的调用结果")
        }, 5000)
    })
}

//不关心顺序 直接执行 但要等全部都返回完毕后才会接受最终的返回值
function test1() {
    Promise.all([a(), b(), c()]).then(data => {
        console.log("我是最终的返回值", data)
    })
}

//按照指定的顺序调用，链式传递参数
async function test2() {
    let list = [a, b, c]
    let resolveData = "我是初始参数值"
    for (let item of list) {
        resolveData = await item(resolveData)
    }
    console.log("打印最后一个异步任务的调用结果值:", resolveData)
}
