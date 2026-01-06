# 快速 Diff 算法

本章我们将讨论第三种用于比较新旧两组子节点的方式：快速Diff 算法。正如其名，该算法的实测速度非常快。
该算法最早应用于 ivi 和 inferno 这两个框架，Vue.js 3 借鉴并扩展了它。下图比较了 ivi、inferno 以及 Vue.js 2 的性能。

![avatar](/Vue/images/第367页-98.png)

上图来自 js-framework-benchmark，从中可以看出，在 DOM 操作的各个方面，ivi 和 inferno 所采用的快速 Diff 算法的性能都要稍优于 Vue.js 2 所采用的双端 Diff 算法。
既然快速 Diff 算法如此高效，我们有必要了解它的思路。接下来，我们就着重讨论快速 Diff 算法的实现原理。

## 相同的前置元素和后置元素

不同于简单 Diff 算法和双端 Diff 算法，快速 Diff 算法包含预处理步骤，这其实是借鉴了纯文本 Diff 算法的思路。
在纯文本 Diff 算法中，存在对两段文本进行预处理的过程。例如，在对两段文本进行 Diff 之前，可以先对它们进行全等比较：

```javascript
if (text1 === text2) return
```

这也称为快捷路径。如果两段文本全等，那么就无须进入核心 Diff 算法的步骤了。除此之外，预处理过程还会处理两段文本相同的前缀和后缀。假设有如下两段文本：

```text
TEXT1: I use vue for app development
TEXT2: I use react for app development
```

通过肉眼可以很容易发现，这两段文本的头部和尾部分别有一段相同的内容，如下图所示。

![avatar](/Vue/images/第368页-99.png)

上图突出显示了 TEXT1 和 TEXT2 中相同的内容。对于内容相同的问题，是不需要进行核心 Diff 操作的。因此，对于 TEXT1 和 TEXT2 来说，真正需要进行 Diff 操作的部分是：

```text
TEXT1: vue
TEXT2: react
```

这实际上是简化问题的一种方式。这么做的好处是，在特定情况下我们能够轻松地判断文本的插入和删除，例如：

```text
TEXT1: I like you
TEXT2: I like you too
```

经过预处理，去掉这两段文本中相同的前缀内容和后缀内容之后，它将变成：

```text
TEXT1:
TEXT2: too
```

可以看到，经过预处理后，TEXT1 的内容为空。这说明 TEXT2 在 TEXT1 的基础上增加了字符串 too。相反，我们还可以将这两段文本的位置互换：

```text
TEXT1: I like you too
TEXT2: I like you
```

这两段文本经过预处理后将变成：

```text
TEXT1: too
TEXT2:
```

由此可知，TEXT2 是在 TEXT1 的基础上删除了字符串 too。

快速 Diff 算法借鉴了纯文本 Diff 算法中预处理的步骤。以下图给出的两组子节点为例。

![avatar](/Vue/images/第370页-101.png)

这两组子节点的顺序如下。

- 旧的一组子节点：p-1、p-2、p-3。

- 新的一组子节点：p-1、p-4、p-2、p-3。

通过观察可以发现，两组子节点具有相同的前置节点 p-1，以及相同的后置节点 p-2 和 p-3，如下图所示。

![avatar](/Vue/images/第370页-100.png)

对于相同的前置节点和后置节点，由于它们在新旧两组子节点中的相对位置不变，所以我们无须移动它们，但仍然需要在它们之间打补丁。

对于前置节点，我们可以建立索引 j，其初始值为 0，用来指向两组子节点的开头，如下图所示。

![avatar](/Vue/images/第371页-102.png)

然后开启一个 while 循环，让索引 j 递增，直到遇到不相同的节点为止，如下面 patchKeyedChildren 函数的代码所示：

```javascript
01 function patchKeyedChildren(n1, n2, container) {
02 const newChildren = n2.children
03 const oldChildren = n1.children
04 // 处理相同的前置节点
05 // 索引 j 指向新旧两组子节点的开头
06 let j = 0
07 let oldVNode = oldChildren[j]
08 let newVNode = newChildren[j]
09 // while 循环向后遍历，直到遇到拥有不同 key 值的节点为止
10 while (oldVNode.key === newVNode.key) {
11 // 调用 patch 函数进行更新
12 patch(oldVNode, newVNode, container)
13 // 更新索引 j，让其递增
14 j++
15 oldVNode = oldChildren[j]
16 newVNode = newChildren[j]
17 }
18
19 }
```

在上面这段代码中，我们使用 while 循环查找所有相同的前置节点，并调用 patch 函数进行打补丁，直到遇到 key 值不同的节点为止。
这样，我们就完成了对前置节点的更新。在这一步更新操作过后，新旧两组子节点的状态如下图所示。

![avatar](/Vue/images/第372页-103.png)

这里需要注意的是，当 while 循环终止时，索引 j 的值为 1。接下来，我们需要处理相同的后置节点。
由于新旧两组子节点的数量可能不同，所以我们需要两个索引 newEnd 和 oldEnd，分别指向新旧两组子节点中的最后一个节点，如下图所示。

![avatar](/Vue/images/第373页-104.png)

然后，再开启一个 while 循环，并从后向前遍历这两组子节点，直到遇到 key 值不同的节点为止，如下面的代码所示：

```javascript
01 function patchKeyedChildren(n1, n2, container) {
02 const newChildren = n2.children
03 const oldChildren = n1.children
04 // 更新相同的前置节点
05 let j = 0
06 let oldVNode = oldChildren[j]
07 let newVNode = newChildren[j]
08 while (oldVNode.key === newVNode.key) {
09 patch(oldVNode, newVNode, container)
10 j++
11 oldVNode = oldChildren[j]
12 newVNode = newChildren[j]
13 }
14
15 // 更新相同的后置节点
16 // 索引 oldEnd 指向旧的一组子节点的最后一个节点
17 let oldEnd = oldChildren.length - 1
18 // 索引 newEnd 指向新的一组子节点的最后一个节点
19 let newEnd = newChildren.length - 1
20
21 oldVNode = oldChildren[oldEnd]
22 newVNode = newChildren[newEnd]
23
24 // while 循环从后向前遍历，直到遇到拥有不同 key 值的节点为止
25 while (oldVNode.key === newVNode.key) {
26 // 调用 patch 函数进行更新
27 patch(oldVNode, newVNode, container)
28 // 递减 oldEnd 和 nextEnd
29 oldEnd--
30 newEnd--
31 oldVNode = oldChildren[oldEnd]
32 newVNode = newChildren[newEnd]
33 }
34
35 }
```

与处理相同的前置节点一样，在 while 循环内，需要调用 patch 函数进行打补丁，然后递减两个索引 oldEnd、newEnd 的值。
在这一步更新操作过后，新旧两组子节点的状态如下图所示。

![avatar](/Vue/images/第374页-105.png)

由上图可知，当相同的前置节点和后置节点被处理完毕后，旧的一组子节点已经全部被处理了，而在新的一组子节点中，还遗留了一个未被处理的节点 p-4。
其实不难发现，节点 p-4 是一个新增节点。那么，如何用程序得出“节点 p-4 是新增节点”这个结论呢？这需要我们观察三个索引 j、newEnd 和 oldEnd 之间的关系。

- 条件一 oldEnd < j 成立：说明在预处理过程中，所有旧子节点都处理完毕了。

- 条件二 newEnd >= j 成立：说明在预处理过后，在新的一组子节点中，仍然有未被处理的节点，而这些遗留的节点将被视作新增节点。

如果条件一和条件二同时成立，说明在新的一组子节点中，存在遗留节点，且这些节点都是新增节点。因此我们需要将它们挂载到正确的位置，如下图所示。

![avatar](/Vue/images/第375页-106.png)

在新的一组子节点中，索引值处于 j 和 newEnd 之间的任何节点都需要作为新的子节点进行挂载。
那么，应该怎样将这些节点挂载到正确位置呢？这就要求我们必须找到正确的锚点元素。
观察上图中新的一组子节点可知，新增节点应该挂载到节点 p-2 所对应的真实 DOM 前面。
所以，节点 p-2 对应的真实 DOM 节点就是挂载操作的锚点元素。有了这些信息，我们就可以给出具体的代码实现了，如下所示：

```javascript
01 function patchKeyedChildren(n1, n2, container) {
02 const newChildren = n2.children
03 const oldChildren = n1.children
04 // 更新相同的前置节点
05 // 省略部分代码
06
07 // 更新相同的后置节点
08 // 省略部分代码
09
10 // 预处理完毕后，如果满足如下条件，则说明从 j --> newEnd 之间的节点应作为新节点插入
11 if (j > oldEnd && j <= newEnd) {
12 // 锚点的索引
13 const anchorIndex = newEnd + 1
14 // 锚点元素
15 const anchor = anchorIndex < newChildren.length ? newChildren[anchorIndex].el : null
16 // 采用 while 循环，调用 patch 函数逐个挂载新增节点
17 while (j <= newEnd) {
18 patch(null, newChildren[j++], container, anchor)
19 }
20 }
21
22 }
```

在上面这段代码中，首先计算锚点的索引值（即 anchorIndex）为 newEnd + 1。如果小于新的一组子节点的数量，则说明锚点元素在新的一组子节点中，所以直接使用 newChildren[anchorIndex].el 作为锚点元素；
否则说明索引newEnd 对应的节点已经是尾部节点了，这时无须提供锚点元素。有了锚点元素之后，我们开启了一个 while 循环，用来遍历索引 j 和索引 newEnd 之间的节点，并调用 patch 函数挂载它们。

上面的案例展示了新增节点的情况，我们再来看看删除节点的情况，如下图所示。

![avatar](/Vue/images/第377页-108.png)

在这个例子中，新旧两组子节点的顺序如下。

- 旧的一组子节点：p-1、p-2、p-3。

- 新的一组子节点：p-1、p-3。

我们同样使用索引 j、oldEnd 和 newEnd 进行标记，如下图所示。

![avatar](/Vue/images/第377页-107.png)

接着，对相同的前置节点进行预处理，处理后的状态如下图所示。

![avatar](/Vue/images/第378页-110.png)

然后，对相同的后置节点进行预处理，处理后的状态如下图所示。

![avatar](/Vue/images/第378页-109.png)

由上图可知，当相同的前置节点和后置节点全部被处理完毕后，新的一组子节点已经全部被处理完毕了，而旧的一组子节点中遗留了一个节点 p-2。
这说明，应该卸载节点 p-2。实际上，遗留的节点可能有多个，如下图所示。

![avatar](/Vue/images/第379页-111.png)

索引 j 和索引 oldEnd 之间的任何节点都应该被卸载，具体实现如下：

```javascript
01 function patchKeyedChildren(n1, n2, container) {
02 const newChildren = n2.children
03 const oldChildren = n1.children
04 // 更新相同的前置节点
05 // 省略部分代码
06
07 // 更新相同的后置节点
08 // 省略部分代码
09
10 if (j > oldEnd && j <= newEnd) {
11 // 省略部分代码
12 } else if (j > newEnd && j <= oldEnd) {
13 // j -> oldEnd 之间的节点应该被卸载
14 while (j <= oldEnd) {
15 unmount(oldChildren[j++])
16 }
17 }
18
19 }
```

在上面这段代码中，我们新增了一个 else...if 分支。当满足条件 j > newEnd && j <= oldEnd 时，则开启一个 while 循环，并调用 unmount 函数逐个卸载这些遗留节点。

## 判断是否需要进行 DOM 移动操作

在上一节中，我们讲解了快速 Diff 算法的预处理过程，即处理相同的前置节点和后置节点。
但是，上一节给出的例子比较理想化，当处理完相同的前置节点或后置节点后，新旧两组子节点中总会有一组子节点全部被处理完毕。
在这种情况下，只需要简单地挂载、卸载节点即可。但有时情况会比较复杂，如下图中给出的例子。

![avatar](/Vue/images/第380页-112.png)

在这个例子中，新旧两组子节点的顺序如下。

- 旧的一组子节点：p-1、p-2、p-3、p-4、p-6、p-5。

- 新的一组子节点：p-1、p-3、p-4、p-2、p-7、p-5。

可以看到，与旧的一组子节点相比，新的一组子节点多出了一个 新节点 p-7，少了一个节点 p-6。
这个例子并不像上一节给出的例子那样理想化，我们无法简单地通过预处理过程完成更新。
在这个例子中，相同的前置节点只有 p-1，而相同的后置节点只有 p-5，如下图所示。

![avatar](/Vue/images/第381页-114.png)

下图给出了经过预处理后两组子节点的状态。

![avatar](/Vue/images/第381页-113.png)

可以看到，经过预处理后，无论是新的一组子节点，还是旧的一组子节点，都有部分节点未经处理。这时就需要我们进一步处理。
怎么处理呢？其实无论是简单 Diff 算法，还是双端 Diff 算法，抑或本章介绍的快速 Diff 算法，它们都遵循同样的处理规则：

- 判断是否有节点需要移动，以及应该如何移动；

- 找出那些需要被添加或移除的节点。

所以接下来我们的任务就是，判断哪些节点需要移动，以及应该如何移动。
观察上图可知，在这种非理想的情况下，当相同的前置节点和后置节点被处理完毕后，索引 j、newEnd 和 oldEnd 不满足下面两个条件中的任何一个：

- j > oldEnd && j <= newEnd

- j > newEnd && j <= oldEnd

因此，我们需要增加新的 else 分支来处理图上所示的情况，如下面的代码所示：

```javascript
01 function patchKeyedChildren(n1, n2, container) {
02 const newChildren = n2.children
03 const oldChildren = n1.children
04 // 更新相同的前置节点
05 // 省略部分代码
06
07 // 更新相同的后置节点
08 // 省略部分代码
09
10 if (j > oldEnd && j <= newEnd) {
11 // 省略部分代码
12 } else if (j > newEnd && j <= oldEnd) {
13 // 省略部分代码
14 } else {
15 // 增加 else 分支来处理非理想情况
16 }
17
18 }
```

后续的处理逻辑将会编写在这个 else 分支内。知道了在哪里编写处理代码，接下来我们讲解具体的处理思路。
首先，我们需要构造一个数组 source，它的长度等于新的一组子节点在经过预处理之后剩余未处理节点的数量，并且 source 中每个元素的初始值都是 -1，如下图所示。

![avatar](/Vue/images/第383页-115.png)

我们可以通过下面的代码完成 source 数组的构造：

```javascript
01 if (j > oldEnd && j <= newEnd) {
02 // 省略部分代码
03 } else if (j > newEnd && j <= oldEnd) {
04 // 省略部分代码
05 } else {
06 // 构造 source 数组
07 // 新的一组子节点中剩余未处理节点的数量
08 const count = newEnd - j + 1
09 const source = new Array(count)
10 source.fill(-1)
11 }
```

如上面的代码所示。首先，我们需要计算新的一组子节点中剩余未处理节点的数量，即 newEnd - j + 1，然后创建一个长度与之相同的数组 source，最后使用 fill 函数完成数组的填充。
那么，数组source 的作用是什么呢？观察上图可以发现，数组 source 中的每一个元素分别与新的一组子节点中剩余未处理节点对应。
实际上，**source 数组将用来存储新的一组子节点中的节点在旧的一组子节点中的位置索引，后面将会使用它计算出一个最长递增子序列，并用于辅助完成 DOM 移动的操作**，如下图所示。

![avatar](/Vue/images/第384页-116.png)

上图展示了填充 source 数组的过程。由于 source 数组存储的是新子节点在旧的一组子节点中的位置索引，所以有：

- 新的一组子节点中的节点 p-3 在旧的一组子节点中的索引为 2，因此 source 数组的第一个元素值为 2；

- 新的一组子节点中的节点 p-4 在旧的一组子节点中的索引为 3，因此 source 数组的第二个元素值为 3；

- 新的一组子节点中的节点 p-2 在旧的一组子节点中的索引为 1，因此 source 数组的第三个元素值为 1；

- 新的一组子节点中的节点 p-7 比较特殊，因为在旧的一组子节点中没有与其 key 值相等的节点，所以 source 数组的第四个元素值保留原来的 -1。

我们可以通过两层 for 循环来完成 source 数组的填充工作，外层循环用于遍历旧的一组子节点，内层循环用于遍历新的一组子节点：

```javascript
01 if (j > oldEnd && j <= newEnd) {
02 // 省略部分代码
03 } else if (j > newEnd && j <= oldEnd) {
04 // 省略部分代码
05 } else {
06 const count = newEnd - j + 1
07 const source = new Array(count)
08 source.fill(-1)
09
10 // oldStart 和 newStart 分别为起始索引，即 j
11 const oldStart = j
12 const newStart = j
13 // 遍历旧的一组子节点
14 for (let i = oldStart; i <= oldEnd; i++) {
15 const oldVNode = oldChildren[i]
16 // 遍历新的一组子节点
17 for (let k = newStart; k <= newEnd; k++) {
18 const newVNode = newChildren[k]
19 // 找到拥有相同 key 值的可复用节点
20 if (oldVNode.key === newVNode.key) {
21 // 调用 patch 进行更新
22 patch(oldVNode, newVNode, container)
23 // 最后填充 source 数组
24 source[k - newStart] = i
25 }
26 }
27 }
28 }
```

这里需要注意的是，由于数组 source 的索引是从 0 开始的，而未处理节点的索引未必从 0 开始，所以在填充数组时需要使用表达式 k - newStart 的值作为数组的索引值。
外层循环的变量 i 就是当前节点在旧的一组子节点中的位置索引，因此直接将变量 i 的值赋给 source [k - newStart] 即可。

现在，source 数组已经填充完毕，我们后面会用到它。不过在进一步讲解之前，我们需要回头思考一下上面那段用于填充 source 数组的代码存在怎样的问题。
这段代码中我们采用了两层嵌套的循环，其时间复杂度为 O(n1 * n2)，其中 n1 和 n2 为新旧两组子节点的数量，我们也可以使用 O(n^2) 来表示。
当新旧两组子节点的数量较多时，两层嵌套的循环会带来性能问题。出于优化的目的，我们可以为新的一组子节点构建一张索引表，用来存储节点的 key 和节点位置索引之间的映射，如下图所示。

![avatar](/Vue/images/第386页-117.png)

有了索引表，我们就可以利用它快速地填充 source 数组，如下面的代码所示：

```javascript
01 if (j > oldEnd && j <= newEnd) {
02 // 省略部分代码
03 } else if (j > newEnd && j <= oldEnd) {
04 // 省略部分代码
05 } else {
06 const count = newEnd - j + 1
07 const source = new Array(count)
08 source.fill(-1)
09
10 // oldStart 和 newStart 分别为起始索引，即 j
11 const oldStart = j
12 const newStart = j
13 // 构建索引表
14 const keyIndex = {}
15 for(let i = newStart; i <= newEnd; i++) {
16 keyIndex[newChildren[i].key] = i
17 }
18 // 遍历旧的一组子节点中剩余未处理的节点
19 for(let i = oldStart; i <= oldEnd; i++) {
20 oldVNode = oldChildren[i]
21 // 通过索引表快速找到新的一组子节点中具有相同 key 值的节点位置
22 const k = keyIndex[oldVNode.key]
23
24 if (typeof k !== 'undefined') {
25 newVNode = newChildren[k]
26 // 调用 patch 函数完成更新
27 patch(oldVNode, newVNode, container)
28 // 填充 source 数组
29 source[k - newStart] = i
30 } else {
31 // 没找到
32 unmount(oldVNode)
33 }
34 }
35 }
```

在上面这段代码中，同样使用了两个 for 循环，不过它们不再是嵌套的关系，所以能够将代码的时间复杂度降至 O(n)。
其中，第一个 for 循环用来构建索引表，索引表存储的是节点的 key 值与节点在新的一组子节点中位置索引之间的映射，第二个 for 循环用来遍历旧的一组子节点。
可以看到，我们拿旧子节点的 key 值去索引表 keyIndex 中查找该节点在新的一组子节点中的位置，并将查找结果存储到变量 k 中。
如果 k 存在，说明该节点是可复用的，所以我们调用 patch 函数进行打补丁，并填充 source 数组；否则说明该节点已经不存在于新的一组子节点中了，这时我们需要调用 unmount 函数卸载它。

上述流程执行完毕后，source 数组已经填充完毕了。接下来我们应该思考的是，如何判断节点是否需要移动。
实际上，快速 Diff 算法 判断节点是否需要移动的方法与简单 Diff 算法类似，如下面的代码所示：

```javascript
01 if (j > oldEnd && j <= newEnd) {
02 // 省略部分代码
03 } else if (j > newEnd && j <= oldEnd) {
04 // 省略部分代码
05 } else {
06 // 构造 source 数组
07 const count = newEnd - j + 1 // 新的一组子节点中剩余未处理节点的数量
08 const source = new Array(count)
09 source.fill(-1)
10
11 const oldStart = j
12 const newStart = j
13 // 新增两个变量，moved 和 pos
14 let moved = false
15 let pos = 0
16
17 const keyIndex = {}
18 for(let i = newStart; i <= newEnd; i++) {
19 keyIndex[newChildren[i].key] = i
20 }
21 for(let i = oldStart; i <= oldEnd; i++) {
22 oldVNode = oldChildren[i]
23 const k = keyIndex[oldVNode.key]
24
25 if (typeof k !== 'undefined') {
26 newVNode = newChildren[k]
27 patch(oldVNode, newVNode, container)
28 source[k - newStart] = i
29 // 判断节点是否需要移动
30 if (k < pos) {
31 moved = true
32 } else {
33 pos = k
34 }
35 } else {
36 unmount(oldVNode)
37 }
38 }
39 }
```

在上面这段代码中，我们新增了两个变量 moved 和 pos。前者的初始值为 false，代表是否需要移动节点，后者的初始值为 0，代表遍历旧的一组子节点的过程中遇到的最大索引值 k。
我们在讲解简单 Diff 算法时曾提到，如果在遍历过程中遇到的索引值呈现递增趋势，则说明不需要移动节点，反之则需要。所以在第二个 for 循环内，我们通过比较变量 k 与变量 pos 的值来判断是否需要移动节点。

除此之外，我们还需要一个数量标识，代表已经更新过的节点数量。
我们知道，已经更新过的节点数量应该小于新的一组子节点中需要更新的节点数量。一旦前者超过后者，则说明有多余的节点，我们应该将它们卸载，如下面的代码所示：

```javascript
01 if (j > oldEnd && j <= newEnd) {
02 // 省略部分代码
03 } else if (j > newEnd && j <= oldEnd) {
04 // 省略部分代码
05 } else {
06 // 构造 source 数组
07 const count = newEnd - j + 1
08 const source = new Array(count)
09 source.fill(-1)
10
11 const oldStart = j
12 const newStart = j
13 let moved = false
14 let pos = 0
15 const keyIndex = {}
16 for(let i = newStart; i <= newEnd; i++) {
17 keyIndex[newChildren[i].key] = i
18 }
19 // 新增 patched 变量，代表更新过的节点数量
20 let patched = 0
21 for(let i = oldStart; i <= oldEnd; i++) {
22 oldVNode = oldChildren[i]
23 // 如果更新过的节点数量小于等于需要更新的节点数量，则执行更新
24 if (patched <= count) {
25 const k = keyIndex[oldVNode.key]
26 if (typeof k !== 'undefined') {
27 newVNode = newChildren[k]
28 patch(oldVNode, newVNode, container)
29 // 每更新一个节点，都将 patched 变量 +1
30 patched++
31 source[k - newStart] = i
32 if (k < pos) {
33 moved = true
34 } else {
35 pos = k
36 }
37 } else {
38 // 没找到
39 unmount(oldVNode)
40 }
41 } else {
42 // 如果更新过的节点数量大于需要更新的节点数量，则卸载多余的节点
43 unmount(oldVNode)
44 }
45 }
46 }
```

在上面这段代码中，我们增加了 patched 变量，其初始值为 0，代表更新过的节点数量。
接着，在第二个 for 循环中增加了判断patched <= count，如果此条件成立，则正常执行更新，并且每次更新后都让变量 patched 自增；否则说明剩余的节点都是多余的，于是调用 unmount 函数将它们卸载。

现在，我们通过判断变量 moved 的值，已经能够知道是否需要移动节点，同时也处理了很多边界条件。接下来我们讨论如何移动节点。