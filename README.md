闭包训练题相关代码

function fun(n, o) { console.log(n, o)
return { fun: function (m) { return fun(m, n)
} } } const a = fun(0)
a.fun(1)
a.fun(2)
a.fun(3)
const b = fun(0).fun(1).fun(2).fun(3)