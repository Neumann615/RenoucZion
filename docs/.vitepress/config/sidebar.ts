import type { DefaultTheme } from 'vitepress';

export const sidebar: DefaultTheme.Config['sidebar'] = {
    ES6标准入门: [
        {
            text: "ES6标准入门",
            items: [
                {
                    text: "ECMAScript 6 简介",
                    link: "/ES6标准入门/intro",
                },
                {
                    text: "let 和 const 命令",
                    link: "ES6标准入门/let",
                },
                {
                    text: "变量的解构赋值",
                    link: "ES6标准入门/destructuring",
                },
                {
                    text: "字符串的扩展",
                    link: "ES6标准入门/string",
                },
                {
                    text: "字符串的新增方法",
                    link: "ES6标准入门/string-methods",
                },
                {
                    text: "正则的扩展",
                    link: "ES6标准入门/regex",
                },
                {
                    text: "数值的扩展",
                    link: "ES6标准入门/number",
                },
                {
                    text: "函数的扩展",
                    link: "ES6标准入门/function",
                },
                {
                    text: "数组的扩展",
                    link: "ES6标准入门/array",
                },
                {
                    text: "对象的扩展",
                    link: "ES6标准入门/object",
                },
                {
                    text: "对象的新增方法",
                    link: "ES6标准入门/object-methods",
                },
                {
                    text: "运算符的扩展",
                    link: "ES6标准入门/operator",
                },
                {
                    text: "Symbol",
                    link: "ES6标准入门/symbol",
                },
                {
                    text: "Set 和 Map 数据结构",
                    link: "ES6标准入门/set-map",
                },
                {
                    text: "Proxy",
                    link: "ES6标准入门/proxy",
                },
                {
                    text: "Reflect",
                    link: "ES6标准入门/reflect",
                },
                {
                    text: "Promise 对象",
                    link: "ES6标准入门/promise",
                },
                {
                    text: "Iterator 和 for...of 循环",
                    link: "ES6标准入门/iterator",
                },
                {
                    text: "Generator 函数的语法",
                    link: "ES6标准入门/generator",
                },
                {
                    text: "Generator 函数的异步应用",
                    link: "ES6标准入门/generator-async",
                },
                {
                    text: "async 函数",
                    link: "ES6标准入门/async",
                },
                {
                    text: "Class 的基本语法",
                    link: "ES6标准入门/class",
                },
                {
                    text: "Class 的继承",
                    link: "ES6标准入门/class-extends",
                },
                {
                    text: "Module 的语法",
                    link: "ES6标准入门/module",
                },
                {
                    text: "Module 的加载实现",
                    link: "ES6标准入门/module-loader",
                },
                {
                    text: "编程风格",
                    link: "ES6标准入门/style",
                },
                {
                    text: "读懂规格",
                    link: "ES6标准入门/spec",
                },
                {
                    text: "异步遍历器",
                    link: "ES6标准入门/async-iterator",
                },
                {
                    text: "ArrayBuffer",
                    link: "ES6标准入门/arraybuffer",
                },
                {
                    text: "最新提案",
                    link: "ES6标准入门/proposals",
                },
                {
                    text: "Decorator",
                    link: "ES6标准入门/decorator",
                },
                {
                    text: "参考链接",
                    link: "ES6标准入门/reference",
                },
            ],
        },
    ],
    JavaScript: [
        {
            text: "入门篇",
            collapsed: false,
            items: [
                {
                    text: "导论",
                    link: "/JavaScript/basic/introduction",
                },
                {
                    text: "历史",
                    link: "/JavaScript/basic/history",
                },
                {
                    text: "基本语法",
                    link: "/JavaScript/basic/grammar",
                },
            ],
        },
        {
            text: "数据类型",
            collapsed: false,
            items: [
                {
                    text: "概述",
                    link: "/JavaScript/types/general",
                },
                {
                    text: "null，undefined 和布尔值",
                    link: "/JavaScript/types/null-undefined-boolean",
                },
                {
                    text: "数值",
                    link: "/JavaScript/types/number",
                },
                {
                    text: "字符串",
                    link: "/JavaScript/types/string",
                },
                {
                    text: "对象",
                    link: "/JavaScript/types/object",
                },
                {
                    text: "函数",
                    link: "/JavaScript/types/function",
                },
                {
                    text: "数组",
                    link: "/JavaScript/types/array",
                },
            ],
        },
        {
            text: "运算符",
            collapsed: false,
            items: [
                {
                    text: "算术运算符",
                    link: "/JavaScript/operators/arithmetic",
                },
                {
                    text: "比较运算符",
                    link: "/JavaScript/operators/comparison",
                },
                {
                    text: "布尔运算符",
                    link: "/JavaScript/operators/boolean",
                },
                {
                    text: "二进制位运算符",
                    link: "/JavaScript/operators/bit",
                },
                {
                    text: "其他运算符，运算顺序",
                    link: "/JavaScript/operators/priority",
                },
            ],
        },
        {
            text: "语法专题",
            collapsed: false,
            items: [
                {
                    text: "数据类型的转换",
                    link: "/JavaScript/features/conversion",
                },
                {
                    text: "错误处理机制",
                    link: "/JavaScript/features/error",
                },
                {
                    text: "编程风格",
                    link: "/JavaScript/features/style",
                },
                {
                    text: "console 对象与控制台",
                    link: "/JavaScript/features/console",
                },
            ],
        },
        {
            text: "标准库",
            collapsed: false,
            items: [
                {
                    text: "Object 对象",
                    link: "/JavaScript/stdlib/object",
                },
                {
                    text: "属性描述对象",
                    link: "/JavaScript/stdlib/attributes",
                },
                {
                    text: "Array 对象",
                    link: "/JavaScript/stdlib/array",
                },
                {
                    text: "包装对象",
                    link: "/JavaScript/stdlib/wrapper",
                },
                {
                    text: "Boolean 对象",
                    link: "/JavaScript/stdlib/boolean",
                },
                {
                    text: "Number 对象",
                    link: "/JavaScript/stdlib/number",
                },
                {
                    text: "String 对象",
                    link: "/JavaScript/stdlib/string",
                },
                {
                    text: "Math 对象",
                    link: "/JavaScript/stdlib/math",
                },
                {
                    text: "Date 对象",
                    link: "/JavaScript/stdlib/date",
                },
                {
                    text: "RegExp 对象",
                    link: "/JavaScript/stdlib/regexp",
                },
                {
                    text: "JSON 对象",
                    link: "/JavaScript/stdlib/json",
                },
            ],
        },
        {
            text: "面向对象编程",
            collapsed: false,
            items: [
                {
                    text: "实例对象与 new 命令",
                    link: "/JavaScript/oop/new",
                },
                {
                    text: "this 关键字",
                    link: "/JavaScript/oop/this",
                },
                {
                    text: "对象的继承",
                    link: "/JavaScript/oop/prototype",
                },
                {
                    text: "Object 对象的相关方法",
                    link: "/JavaScript/oop/object",
                },
                {
                    text: "严格模式",
                    link: "/JavaScript/oop/strict",
                },
            ],
        },
        {
            text: "异步操作",
            collapsed: false,
            items: [
                {
                    text: "概述",
                    link: "/JavaScript/async/general",
                },
                {
                    text: "定时器",
                    link: "/JavaScript/async/timer",
                },
                {
                    text: "Promise 对象",
                    link: "/JavaScript/async/promise",
                },
            ],
        },
        {
            text: "文档对象模型(DOM)",
            collapsed: false,
            items: [
                {
                    text: "概述",
                    link: "/JavaScript/dom/general",
                },
                {
                    text: " Node 接口",
                    link: "/JavaScript/dom/node",
                },
                {
                    text: "NodeList 接口，HTMLCollection 接口",
                    link: "/JavaScript/dom/nodelist",
                },
                {
                    text: "ParentNode 接口，ChildNode 接口",
                    link: "/JavaScript/dom/parentnode",
                },
                {
                    text: "Document 节点",
                    link: "/JavaScript/dom/document",
                },
                {
                    text: "Element 节点",
                    link: "/JavaScript/dom/element",
                },
                {
                    text: "属性的操作",
                    link: "/JavaScript/dom/attributes",
                },
                {
                    text: "Text 节点和 DocumentFragment 节点",
                    link: "/JavaScript/dom/text",
                },
                {
                    text: "CSS 操作",
                    link: "/JavaScript/dom/css",
                },
                {
                    text: "Mutation Observer API",
                    link: "/JavaScript/dom/mutationobserver",
                },
            ],
        },
        {
            text: "事件",
            collapsed: false,
            items: [
                {
                    text: "EventTarget 接口",
                    link: "/JavaScript/events/eventtarget",
                },
                {
                    text: "事件模型",
                    link: "/JavaScript/events/model",
                },
                {
                    text: "Event 对象",
                    link: "/JavaScript/events/event",
                },
                {
                    text: "鼠标事件",
                    link: "/JavaScript/events/mouse",
                },
                {
                    text: "键盘事件",
                    link: "/JavaScript/events/keyboard",
                },
                {
                    text: "进度事件",
                    link: "/JavaScript/events/progress",
                },
                {
                    text: "表单事件",
                    link: "/JavaScript/events/form",
                },
                {
                    text: "触摸事件",
                    link: "/JavaScript/events/touch",
                },
                {
                    text: "拖拉事件",
                    link: "/JavaScript/events/drag",
                },
                {
                    text: "其他常见事件",
                    link: "/JavaScript/events/common",
                },
                {
                    text: "GlobalEventHandlers 接口",
                    link: "/JavaScript/events/globaleventhandlers",
                },
            ],
        },
        {
            text: "浏览器对象模型(BOM)",
            collapsed: false,
            items: [
                {
                    text: "浏览器模型概述",
                    link: "/JavaScript/bom/engine",
                },
                {
                    text: "window 对象",
                    link: "/JavaScript/bom/window",
                },
                {
                    text: "Navigator 对象，Screen 对象",
                    link: "/JavaScript/bom/navigator",
                },
                {
                    text: "Cookie",
                    link: "/JavaScript/bom/cookie",
                },
                {
                    text: "XMLHttpRequest 对象",
                    link: "/JavaScript/bom/xmlhttprequest",
                },
                {
                    text: "同源限制",
                    link: "/JavaScript/bom/same-origin",
                },
                {
                    text: "CORS 通信",
                    link: "/JavaScript/bom/cors",
                },
                {
                    text: "Storage 接口",
                    link: "/JavaScript/bom/storage",
                },
                {
                    text: "History 对象",
                    link: "/JavaScript/bom/history",
                },
                {
                    text: "Location 对象，URL 对象，URLSearchParams 对象",
                    link: "/JavaScript/bom/location",
                },
                {
                    text: "ArrayBuffer 对象，Blob 对象",
                    link: "/JavaScript/bom/arraybuffer",
                },
                {
                    text: "File 对象，FileList 对象，FileReader 对象",
                    link: "/JavaScript/bom/file",
                },
                {
                    text: "表单，FormData 对象",
                    link: "/JavaScript/bom/form",
                },
                {
                    text: "IndexedDB API",
                    link: "/JavaScript/bom/indexeddb",
                },
                {
                    text: "Web Worker",
                    link: "/JavaScript/bom/webworker",
                },
            ],
        },
        {
            text: "网页元素接口",
            collapsed: false,
            items: [
                {
                    text: "a",
                    link: "/JavaScript/elements/a",
                },
                {
                    text: "img",
                    link: "/JavaScript/elements/image",
                },
                {
                    text: "form",
                    link: "/JavaScript/elements/form",
                },
                {
                    text: "input",
                    link: "/JavaScript/elements/input",
                },
                {
                    text: "button",
                    link: "/JavaScript/elements/button",
                },
                {
                    text: "option",
                    link: "/JavaScript/elements/option",
                },
                {
                    text: "video，audio",
                    link: "/JavaScript/elements/video",
                },
            ],
        },
    ],
    TypeScript: [
        {
            text: "TypeScript教程",
            items: [
                {
                    text: "简介",
                    link: "/TypeScript/intro",
                },
                {
                    text: "any类型",
                    link: "/TypeScript/any",
                },
                {
                    text: "类型系统",
                    link: "/TypeScript/types",
                },
                {
                    text: "数组",
                    link: "/TypeScript/array",
                },
                {
                    text: "元组",
                    link: "/TypeScript/tuple",
                },
                {
                    text: "symbol类型",
                    link: "/TypeScript/symbol",
                },
                {
                    text: "函数",
                    link: "/TypeScript/function",
                },
                {
                    text: "对象",
                    link: "/TypeScript/object",
                },
                {
                    text: "interface",
                    link: "/TypeScript/interface",
                },
                {
                    text: "类",
                    link: "/TypeScript/class",
                },
                {
                    text: "泛型",
                    link: "/TypeScript/generics",
                },
                {
                    text: "Enum类型",
                    link: "/TypeScript/enum",
                },
                {
                    text: "类型断言",
                    link: "/TypeScript/assert",
                },
                {
                    text: "模块",
                    link: "/TypeScript/module",
                },
                {
                    text: "namespace",
                    link: "/TypeScript/namespace",
                },
                {
                    text: "装饰器",
                    link: "/TypeScript/decorator",
                },
                {
                    text: "装饰器(旧)",
                    link: "/TypeScript/decorator-legacy",
                },
                {
                    text: "declare 关键字",
                    link: "/TypeScript/declare",
                },
                {
                    text: "d.ts 类型声明文件",
                    link: "/TypeScript/d-ts",
                },
                {
                    text: "类型运算符",
                    link: "/TypeScript/operator",
                },
                {
                    text: "类型映射",
                    link: "/TypeScript/mapping",
                },
                {
                    text: "类型工具",
                    link: "/TypeScript/utility",
                },
                {
                    text: "注释指令",
                    link: "/TypeScript/comment",
                },
                {
                    text: "tsconfig.json文件",
                    link: "/TypeScript/tsconfig-json",
                },
                {
                    text: "tsc命令",
                    link: "/TypeScript/tsc",
                },
            ],
        },
    ],
    Vue: [
        {
            text: "框架设计概览",
            items: [
                {
                    text: "权衡的艺术",
                    link: "/Vue/框架设计概览/权衡的艺术",
                },
                {
                    text: "框架设计的核心要素",
                    link: "/Vue/框架设计概览/框架设计的核心要素",
                },
                {
                    text: "Vue.js3的设计思路",
                    link: "/Vue/框架设计概览/Vue.js3的设计思路",
                },
            ],
        },
        {
            text: "响应系统",
            items: [
                {
                    text: "响应系统的作用与实现",
                    link: "/Vue/响应系统/响应系统的作用与实现",
                },
                {
                    text: "非原始值的响应式方案",
                    link: "/Vue/响应系统/非原始值的响应式方案",
                },
                {
                    text: "原始值的响应式方案",
                    link: "/Vue/响应系统/原始值的响应式方案",
                },
            ],
        },
        {
            text: "渲染器",
            items: [
                {
                    text: "渲染器的设计",
                    link: "/Vue/渲染器/渲染器的设计",
                },
                {
                    text: "挂载与更新",
                    link: "/Vue/渲染器/挂载与更新",
                },
                {
                    text: "简单 Diff 算法",
                    link: "/Vue/渲染器/简单 Diff 算法",
                },
                {
                    text: "双端 Diff 算法",
                    link: "/Vue/渲染器/双端 Diff 算法",
                },
                {
                    text: "快速 Diff 算法",
                    link: "/Vue/渲染器/快速 Diff 算法",
                },
            ],
        },
        {
            text: "组件化",
            items: [
                {
                    text: "组件的实现原理",
                    link: "/Vue/组件化/组件的实现原理",
                },
                {
                    text: "异步组件与函数式组件",
                    link: "/Vue/组件化/异步组件与函数式组件",
                },
                {
                    text: "内建组件和模块",
                    link: "/Vue/组件化/内建组件和模块",
                },
            ],
        },
        {
            text: "编译器",
            items: [
                {
                    text: "编译器核心技术概览",
                    link: "/Vue/编译器/编译器核心技术概览",
                },
                {
                    text: "解析器",
                    link: "/Vue/编译器/解析器",
                },
                {
                    text: "编译优化",
                    link: "/Vue/编译器/编译优化",
                },
            ],
        },
        {
            text: "服务端渲染",
            items: [
                {
                    text: "同构渲染",
                    link: "/Vue/服务端渲染/同构渲染",
                },
            ],
        },
    ],
    React: [
        {
            text: "入门",
            items: [
                { text: "React基本介绍", link: "/React/basic/introduce" },
                { text: "React开发环境搭建", link: "/React/basic/development" },
                { text: "tsx语法入门", link: "/React/basic/tsx" },
            ],
        },
        {
            text: "工具",
            items: [
                { text: "Babel", link: "/React/tools/babel" },
                { text: "Swc", link: "/React/tools/swc" },
            ],
        },
        {
            text: "原理",
            items: [
                { text: "vdom fiber diff", link: "/React/principle/vdom" },
                {
                    text: "requestidlecallback",
                    link: "/React/principle/requestidlecallback",
                },
            ],
        },
        {
            text: "组件",
            items: [
                { text: "认识组件", link: "/React/components/base" },
                { text: "组件通信", link: "/React/components/communication" },
                { text: "受控组件", link: "/React/components/controlled" },
                { text: "传送组件", link: "/React/components/createPortal" },
                { text: "异步组件", link: "/React/components/suspense" },
            ],
        },
        {
            text: "css方案",
            items: [
                { text: "css modules", link: "/React/css/css-modules" },
                { text: "css in js", link: "/React/css/css-in-js" },
                { text: "css 原子化", link: "/React/css/css-atomic" },
            ],
        },
        {
            text: "Hooks",
            items: [
                {
                    text: "数据驱动",
                    items: [
                        { text: "useState", link: "/React/hooks/useState" },
                        { text: "useReducer", link: "/React/hooks/useReducer" },
                        {
                            text: "useSyncExternalStore",
                            link: "/React/hooks/useSyncExternalStore",
                        },
                        { text: "useTransition", link: "/React/hooks/useTransition" },
                        {
                            text: "useDeferredValue",
                            link: "/React/hooks/useDeferredValue",
                        },
                    ],
                },
                {
                    text: "副作用",
                    items: [
                        { text: "useEffect", link: "/React/hooks/useEffect" },
                        {
                            text: "useLayoutEffect",
                            link: "/React/hooks/useLayoutEffect",
                        },
                        {
                            text: "useInsertionEffect",
                            link: "/React/hooks/useInsertionEffect",
                        },
                    ],
                },
                {
                    text: "状态传递",
                    items: [
                        { text: "useRef", link: "/React/hooks/useRef" },
                        {
                            text: "useImperativeHandle",
                            link: "/React/hooks/useImperativeHandle",
                        },
                        { text: "useContext", link: "/React/hooks/useContext" },
                    ],
                },
                {
                    text: "状态派生",
                    items: [
                        { text: "useMemo", link: "/React/hooks/useMemo" },
                        { text: "useCallback", link: "/React/hooks/useCallback" },
                    ],
                },
                {
                    text: "工具Hooks",
                    items: [
                        { text: "useDebugValue", link: "/React/hooks/useDebugValue" },
                        { text: "useId", link: "/React/hooks/useId" },
                    ],
                },
                {
                    text: "其他",
                    items: [{ text: "自定义hooks", link: "/React/hooks/custom" }],
                },
            ],
        },
    ],
    interview: [
        {
            text: "面试题",
            items: [
                {
                    text: "基础面试题",
                    link: "/interview/面试题/基础面试题",
                },
                {
                    text: "进阶面试题",
                    link: "/interview/面试题/进阶面试题",
                },
                {
                    text: "热门面试题",
                    link: "/interview/面试题/热门面试题",
                },
                {
                    text: "冷门面试题",
                    link: "/interview/面试题/冷门面试题",
                },
                {
                    text: "算法题",
                    link: "/interview/数据结构/算法",
                },
                {
                    text: "编程题",
                    link: "/interview/数据结构/设计模式",
                },
                {
                    text: "耻辱柱",
                    link: "/interview/面试题/耻辱柱",
                },
            ],
        },
        {
            text: "基础框架",
            items: [
                {
                    text: "Vue",
                    link: "/interview/基础框架/Vue",
                },
                {
                    text: "React",
                    link: "/interview/基础框架/React",
                },
            ],
        },
        {
            text: "语言相关",
            items: [
                {
                    text: "JavaScript",
                    link: "/interview/语言相关/JavaScript",
                },
                {
                    text: "TypeScript",
                    link: "/interview/语言相关/TypeScript",
                },
            ],
        },
        {
            text: "其他技术",
            items: [
                {
                    text: "WebSocket",
                    link: "/interview/其他技术/WebSocket",
                },
                {
                    text: "Canvas",
                    link: "/interview/其他技术/Canvas",
                },
            ],
        },
        {
            text: "构建工具",
            items: [
                {
                    text: "Webpack",
                    link: "/interview/构建工具/Webpack",
                },
                {
                    text: "Rollup",
                    link: "/interview/构建工具/Rollup",
                },
                {
                    text: "Vite",
                    link: "/interview/构建工具/Vite",
                },
            ],
        },
        {
            text: "数据结构",
            link: "/interview/数据结构/数据结构",
        },
        {
            text: "浏览器",
            link: "/interview/浏览器/浏览器",
        },
        {
            text: "杂项",
            link: "/interview/浏览器/杂项",
        },
        {
            text: "计算机网络",
            link: "/interview/计算机网络/计算机网络",
        },
    ],
    教师资格证: [
        {
            text: "教育教学知识与能力",
            items: [
                {
                    text: "教育基础(上)",
                    link: "/教师资格证/教育教学知识与能力/教育基础(上)",
                },
                {
                    text: "教育基础(下)",
                    link: "/教师资格证/教育教学知识与能力/教育基础(下)",
                },
                {
                    text: "学生指导",
                    link: "/教师资格证/教育教学知识与能力/学生指导",
                },
                {
                    text: "学校与班级管理",
                    link: "/教师资格证/教育教学知识与能力/学校与班级管理",
                },
                {
                    text: "教学实施",
                    link: "/教师资格证/教育教学知识与能力/教学实施",
                },
                {
                    text: "教学评价与反思",
                    link: "/教师资格证/教育教学知识与能力/教学评价与反思",
                },
                {
                    text: "学习心理",
                    link: "/教师资格证/教育教学知识与能力/学习心理",
                },
                {
                    text: "简答题",
                    link: "/教师资格证/教育教学知识与能力/简答题",
                },
                {
                    text: "材料分析题",
                    link: "/教师资格证/教育教学知识与能力/材料分析题",
                },
            ],
        },
        {
            text: "综合素质",
            items: [
                {
                    text: "学习心理",
                    link: "/教师资格证/综合素质/关键知识点",
                },
                {
                    text: "教育教学知识与能力",
                    link: "/教师资格证/综合素质/优秀作文",
                },
            ],
        },
    ],
}