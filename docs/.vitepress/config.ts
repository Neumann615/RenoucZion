import {defineConfig, DefaultTheme} from 'vitepress'

const ogDescription = 'Next Generation Frontend Tooling'
const ogImage = 'https://vitejs.dev/og-image.png'
const ogTitle = 'Bupu'
const ogUrl = 'https://xiaonuo.love'


export default defineConfig({
    title: `Bupu`,
    description: '小诺的个人博客',
    assetsInclude: ['**/*.png', '**/*.jpg',"**/*.PNG"],
    head: [
        ['link', {rel: 'icon', type: 'image/svg+xml', href: '/logo.svg'}],
        ['meta', {property: 'og:type', content: 'website'}],
        ['meta', {property: 'og:title', content: ogTitle}],
        ['meta', {property: 'og:image', content: ogImage}],
        ['meta', {property: 'og:url', content: ogUrl}],
        ['meta', {property: 'og:description', content: ogDescription}],
        ['meta', {name: 'twitter:card', content: 'summary_large_image'}],
        ['meta', {name: 'twitter:site', content: '@vite_js'}],
        ['meta', {name: 'theme-color', content: '#646cff'}]
    ],
    vue: {
        reactivityTransform: true
    },
    themeConfig: {
        logo: '/logo.svg',
        aside: true,
        editLink: {
            pattern: 'https://github.com/vitejs/vite/edit/main/docs/:path',
            text: 'Suggest changes to this page'
        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/Neumann615'}
        ],

        // algolia: {
        //     appId: '7H67QR5P0A',
        //     apiKey: 'deaab78bcdfe96b599497d25acc6460e',
        //     indexName: 'vitejs',
        //     searchParameters: {
        //         facetFilters: ['tags:en']
        //     }
        // },

        carbonAds: {
            code: 'CEBIEK3N',
            placement: 'vitejsdev'
        },

        footer: {
            //message: `Neumann615`,
            copyright: 'Copyright © Bupu'
        },

        nav: [
            {
                text: "基础知识",
                items: [
                    {
                        text: "JavaScript",
                        link: "/JavaScript/basic/introduction"
                    },
                    {
                        text: "ES6标准入门",
                        link: "/ES6标准入门/intro"
                    },
                    {
                        text: "TypeScript",
                        link: "/TypeScript/intro"
                    },
                    {
                        text: "Vue",
                        link: "/Vue/intro.md"
                    },
                    {
                        text: "React",
                        link: "/framework-analysis/react.md"
                    }
                ]
            },
            {
                text: "面试相关",
                link: "/interview/vue"
            },
            {
                text: "旅行计划",
                link: "/旅行计划/云南.md"
            },
            {
                text: "其他资源",
                items: [
                    {
                        text: "组件库",
                        items: [
                            {
                                text: 'ElementPlus',
                                link: 'https://element-plus.gitee.io/zh-CN/'
                            },
                            {
                                text: 'AntDesign',
                                link: 'https://ant-design.gitee.io/index-cn'
                            },
                            {
                                text: 'Vant',
                                link: 'https://vant-contrib.gitee.io/vant/#/zh-CN'
                            },
                            {
                                text: 'Varlet',
                                link: 'https://varlet.gitee.io/varlet-ui/#/zh-CN/home'
                            },
                            {
                                text: 'NaiveUI',
                                link: 'https://www.naiveui.com/zh-CN/os-theme'
                            }
                        ]
                    },
                    {
                        text: "构建工具",
                        items: [
                            {
                                text: 'Webpack',
                                link: 'https://webpack.docschina.org/'
                            },
                            {
                                text: 'Vite',
                                link: 'http://www.vitejs.net/'
                            },
                            {
                                text: "Rspack",
                                link: "https://www.rspack.dev/zh/index.html"
                            },
                            {
                                text: "Gulp",
                                link: "https://www.gulpjs.com.cn/"
                            },
                            {
                                text: "Grunt",
                                link: "https://www.gruntjs.net/"
                            }
                        ]
                    },
                    {
                        text: "代码分析",
                        items: [
                            {
                                text: 'ast语法解析',
                                link: 'https://astexplorer.net/'
                            },
                            {
                                text: 'js运行机制可视化',
                                link: 'https://www.jsv9000.app/'
                            }
                        ]
                    }
                ]
            }
        ],

        sidebar: {
            "ES6标准入门": [
                {
                    text: "ES6标准入门",
                    items: [
                        {
                            text: "ECMAScript 6 简介",
                            link: "ES6标准入门/intro"
                        },
                        {
                            text: "let 和 const 命令",
                            link: "ES6标准入门/let"
                        },
                        {
                            text: "变量的解构赋值",
                            link: "ES6标准入门/destructuring"
                        },
                        {
                            text: "字符串的扩展",
                            link: "ES6标准入门/string"
                        },
                        {
                            text: "字符串的新增方法",
                            link: "ES6标准入门/string-methods"
                        },
                        {
                            text: "正则的扩展",
                            link: "ES6标准入门/regex"
                        },
                        {
                            text: "数值的扩展",
                            link: "ES6标准入门/number"
                        },
                        {
                            text: "函数的扩展",
                            link: "ES6标准入门/function"
                        },
                        {
                            text: "数组的扩展",
                            link: "ES6标准入门/array"
                        },
                        {
                            text: "对象的扩展",
                            link: "ES6标准入门/object"
                        },
                        {
                            text: "对象的新增方法",
                            link: "ES6标准入门/object-methods"
                        },
                        {
                            text: "运算符的扩展",
                            link: "ES6标准入门/operator"
                        },
                        {
                            text: "Symbol",
                            link: "ES6标准入门/symbol"
                        },
                        {
                            text: "Set 和 Map 数据结构",
                            link: "ES6标准入门/set-map"
                        },
                        {
                            text: "Proxy",
                            link: "ES6标准入门/proxy"
                        },
                        {
                            text: "Reflect",
                            link: "ES6标准入门/reflect"
                        },
                        {
                            text: "Promise 对象",
                            link: "ES6标准入门/promise"
                        },
                        {
                            text: "Iterator 和 for...of 循环",
                            link: "ES6标准入门/iterator"
                        },
                        {
                            text: "Generator 函数的语法",
                            link: "ES6标准入门/generator"
                        },
                        {
                            text: "Generator 函数的异步应用",
                            link: "ES6标准入门/generator-async"
                        },
                        {
                            text: "async 函数",
                            link: "ES6标准入门/async"
                        },
                        {
                            text: "Class 的基本语法",
                            link: "ES6标准入门/class"
                        },
                        {
                            text: "Class 的继承",
                            link: "ES6标准入门/class-extends"
                        },
                        {
                            text: "Module 的语法",
                            link: "ES6标准入门/module"
                        },
                        {
                            text: "Module 的加载实现",
                            link: "ES6标准入门/module-loader"
                        },
                        {
                            text: "编程风格",
                            link: "ES6标准入门/style"
                        },
                        {
                            text: "读懂规格",
                            link: "ES6标准入门/spec"
                        },
                        {
                            text: "异步遍历器",
                            link: "ES6标准入门/async-iterator"
                        },
                        {
                            text: "ArrayBuffer",
                            link: "ES6标准入门/arraybuffer"
                        },
                        {
                            text: "最新提案",
                            link: "ES6标准入门/proposals"
                        },
                        {
                            text: "Decorator",
                            link: "ES6标准入门/decorator"
                        },
                        {
                            text: "参考链接",
                            link: "ES6标准入门/reference"
                        }
                    ]
                }
            ],
            "JavaScript": [
                {
                    text: "入门篇",
                    items: [
                        {
                            text: "导论",
                            link: "/JavaScript/basic/introduction"
                        },
                        {
                            text: "历史",
                            link: "/JavaScript/basic/history"
                        },
                        {
                            text: "基本语法",
                            link: "/JavaScript/basic/grammar"
                        }
                    ]
                },
                {
                    text: "数据类型",
                    items: [
                        {
                            text: "概述",
                            link: "/JavaScript/types/general"
                        },
                        {
                            text: "null，undefined 和布尔值",
                            link: "/JavaScript/types/null-undefined-boolean"
                        },
                        {
                            text: "数值",
                            link: "/JavaScript/types/number"
                        },
                        {
                            text: "字符串",
                            link: "/JavaScript/types/string"
                        },
                        {
                            text: "对象",
                            link: "/JavaScript/types/object"
                        },
                        {
                            text: "函数",
                            link: "/JavaScript/types/function"
                        },
                        {
                            text: "数组",
                            link: "/JavaScript/types/array"
                        }
                    ]
                },
                {
                    text: "运算符",
                    items: [
                        {
                            text: "算术运算符",
                            link: "/JavaScript/operators/arithmetic"
                        },
                        {
                            text: "比较运算符",
                            link: "/JavaScript/operators/comparison"
                        },
                        {
                            text: "布尔运算符",
                            link: "/JavaScript/operators/boolean"
                        },
                        {
                            text: "二进制位运算符",
                            link: "/JavaScript/operators/bit"
                        },
                        {
                            text: "其他运算符，运算顺序",
                            link: "/JavaScript/operators/priority"
                        }
                    ]
                },
                {
                    text: "语法专题",
                    items: [
                        {
                            text: "数据类型的转换",
                            link: "/JavaScript/features/conversion"
                        },
                        {
                            text: "错误处理机制",
                            link: "/JavaScript/features/error"
                        },
                        {
                            text: "编程风格",
                            link: "/JavaScript/features/style"
                        },
                        {
                            text: "console 对象与控制台",
                            link: "/JavaScript/features/console"
                        }
                    ]
                },
                {
                    text: "标准库",
                    items: [
                        {
                            text: "Object 对象",
                            link: "/JavaScript/stdlib/object"
                        },
                        {
                            text: "属性描述对象",
                            link: "/JavaScript/stdlib/attributes"
                        },
                        {
                            text: "Array 对象",
                            link: "/JavaScript/stdlib/array"
                        },
                        {
                            text: "包装对象",
                            link: "/JavaScript/stdlib/wrapper"
                        },
                        {
                            text: "Boolean 对象",
                            link: "/JavaScript/stdlib/boolean"
                        },
                        {
                            text: "Number 对象",
                            link: "/JavaScript/stdlib/number"
                        },
                        {
                            text: "String 对象",
                            link: "/JavaScript/stdlib/string"
                        },
                        {
                            text: "Math 对象",
                            link: "/JavaScript/stdlib/math"
                        },
                        {
                            text: "Date 对象",
                            link: "/JavaScript/stdlib/date"
                        },
                        {
                            text: "RegExp 对象",
                            link: "/JavaScript/stdlib/regexp"
                        },
                        {
                            text: "JSON 对象",
                            link: "/JavaScript/stdlib/json"
                        }
                    ]
                },
                {
                    text: "面向对象编程",
                    items: [
                        {
                            text: "实例对象与 new 命令",
                            link: "/JavaScript/oop/new"
                        },
                        {
                            text: "this 关键字",
                            link: "/JavaScript/oop/this"
                        },
                        {
                            text: "对象的继承",
                            link: "/JavaScript/oop/prototype"
                        },
                        {
                            text: "Object 对象的相关方法",
                            link: "/JavaScript/oop/object"
                        },
                        {
                            text: "严格模式",
                            link: "/JavaScript/oop/strict"
                        }
                    ]
                },
                {
                    text: "异步操作",
                    items: [
                        {
                            text: "概述",
                            link: "/JavaScript/async/general"
                        },
                        {
                            text: "定时器",
                            link: "/JavaScript/async/timer"
                        },
                        {
                            text: "Promise 对象",
                            link: "/JavaScript/async/promise"
                        }
                    ]
                },
                {
                    text: "文档对象模型(DOM)",
                    items: [
                        {
                            text: "概述",
                            link: "/JavaScript/dom/general"
                        },
                        {
                            text: " Node 接口",
                            link: "/JavaScript/dom/node"
                        },
                        {
                            text: "NodeList 接口，HTMLCollection 接口",
                            link: "/JavaScript/dom/nodelist"
                        },
                        {
                            text: "ParentNode 接口，ChildNode 接口",
                            link: "/JavaScript/dom/parentnode"
                        },
                        {
                            text: "Document 节点",
                            link: "/JavaScript/dom/document"
                        },
                        {
                            text: "Element 节点",
                            link: "/JavaScript/dom/element"
                        },
                        {
                            text: "属性的操作",
                            link: "/JavaScript/dom/attributes"
                        },
                        {
                            text: "Text 节点和 DocumentFragment 节点",
                            link: "/JavaScript/dom/text"
                        },
                        {
                            text: "CSS 操作",
                            link: "/JavaScript/dom/css"
                        },
                        {
                            text: "Mutation Observer API",
                            link: "/JavaScript/dom/mutationobserver"
                        }
                    ]
                },
                {
                    text: "事件",
                    items: [
                        {
                            text: "EventTarget 接口",
                            link: "/JavaScript/events/eventtarget"
                        },
                        {
                            text: "事件模型",
                            link: "/JavaScript/events/model"
                        },
                        {
                            text: "Event 对象",
                            link: "/JavaScript/events/event"
                        },
                        {
                            text: "鼠标事件",
                            link: "/JavaScript/events/mouse"
                        },
                        {
                            text: "键盘事件",
                            link: "/JavaScript/events/keyboard"
                        },
                        {
                            text: "进度事件",
                            link: "/JavaScript/events/progress"
                        },
                        {
                            text: "表单事件",
                            link: "/JavaScript/events/form"
                        },
                        {
                            text: "触摸事件",
                            link: "/JavaScript/events/touch"
                        },
                        {
                            text: "拖拉事件",
                            link: "/JavaScript/events/drag"
                        },
                        {
                            text: "其他常见事件",
                            link: "/JavaScript/events/common"
                        },
                        {
                            text: "GlobalEventHandlers 接口",
                            link: "/JavaScript/events/globaleventhandlers"
                        }
                    ]
                },
                {
                    text: "浏览器对象模型(BOM)",
                    items: [
                        {
                            text: "浏览器模型概述",
                            link: "/JavaScript/bom/engine"
                        },
                        {
                            text: "window 对象",
                            link: "/JavaScript/bom/window"
                        },
                        {
                            text: "Navigator 对象，Screen 对象",
                            link: "/JavaScript/bom/navigator"
                        },
                        {
                            text: "Cookie",
                            link: "/JavaScript/bom/cookie"
                        },
                        {
                            text: "XMLHttpRequest 对象",
                            link: "/JavaScript/bom/xmlhttprequest"
                        },
                        {
                            text: "同源限制",
                            link: "/JavaScript/bom/same-origin"
                        },
                        {
                            text: "CORS 通信",
                            link: "/JavaScript/bom/cors"
                        },
                        {
                            text: "Storage 接口",
                            link: "/JavaScript/bom/storage"
                        },
                        {
                            text: "History 对象",
                            link: "/JavaScript/bom/history"
                        },
                        {
                            text: "Location 对象，URL 对象，URLSearchParams 对象",
                            link: "/JavaScript/bom/location"
                        },
                        {
                            text: "ArrayBuffer 对象，Blob 对象",
                            link: "/JavaScript/bom/arraybuffer"
                        },
                        {
                            text: "File 对象，FileList 对象，FileReader 对象",
                            link: "/JavaScript/bom/file"
                        },
                        {
                            text: "表单，FormData 对象",
                            link: "/JavaScript/bom/form"
                        },
                        {
                            text: "IndexedDB API",
                            link: "/JavaScript/bom/indexeddb"
                        },
                        {
                            text: "Web Worker",
                            link: "/JavaScript/bom/webworker"
                        }
                    ]
                },
                {
                    text: "网页元素接口",
                    items: [
                        {
                            text: "a",
                            link: "/JavaScript/elements/a"
                        },
                        {
                            text: "img",
                            link: "/JavaScript/elements/image"
                        },
                        {
                            text: "form",
                            link: "/JavaScript/elements/form"
                        },
                        {
                            text: "input",
                            link: "/JavaScript/elements/input"
                        },
                        {
                            text: "button",
                            link: "/JavaScript/elements/button"
                        },
                        {
                            text: "option",
                            link: "/JavaScript/elements/option"
                        },
                        {
                            text: "video，audio",
                            link: "/JavaScript/elements/video"
                        }
                    ]
                }
            ],
            "TypeScript": [
                {
                    text: "TypeScript教程",
                    items: [
                        {
                            text: "简介",
                            link: "/TypeScript/intro"
                        },
                        {
                            text: "any类型",
                            link: "/TypeScript/any"
                        },
                        {
                            text: "类型系统",
                            link: "/TypeScript/types"
                        },
                        {
                            text: "数组",
                            link: "/TypeScript/array"
                        },
                        {
                            text: "元组",
                            link: "/TypeScript/tuple"
                        },
                        {
                            text: "symbol类型",
                            link: "/TypeScript/symbol"
                        },
                        {
                            text: "函数",
                            link: "/TypeScript/function"
                        },
                        {
                            text: "对象",
                            link: "/TypeScript/object"
                        },
                        {
                            text: "interface",
                            link: "/TypeScript/interface"
                        },
                        {
                            text: "类",
                            link: "/TypeScript/class"
                        },
                        {
                            text: "泛型",
                            link: "/TypeScript/generics"
                        },
                        {
                            text: "Enum类型",
                            link: "/TypeScript/enum"
                        },
                        {
                            text: "类型断言",
                            link: "/TypeScript/assert"
                        },
                        {
                            text: "模块",
                            link: "/TypeScript/module"
                        },
                        {
                            text: "namespace",
                            link: "/TypeScript/namespace"
                        },
                        {
                            text: "装饰器",
                            link: "/TypeScript/decorator"
                        },
                        {
                            text: "装饰器(旧)",
                            link: "/TypeScript/decorator-legacy"
                        },
                        {
                            text: "declare 关键字",
                            link: "/TypeScript/declare"
                        },
                        {
                            text: "d.ts 类型声明文件",
                            link: "/TypeScript/d-ts"
                        },
                        {
                            text: "类型运算符",
                            link: "/TypeScript/operator"
                        },
                        {
                            text: "类型映射",
                            link: "/TypeScript/mapping"
                        },
                        {
                            text: "类型工具",
                            link: "/TypeScript/utility"
                        },
                        {
                            text: "注释指令",
                            link: "/TypeScript/comment"
                        },
                        {
                            text: "tsconfig.json文件",
                            link: "/TypeScript/tsconfig-json"
                        },
                        {
                            text: "tsc命令",
                            link: "/TypeScript/tsc"
                        }
                    ]
                }
            ],
            "Vue": [
                {
                    text: '导读',
                    items: [
                        {
                            text: "说明",
                            link: "/Vue/intro"
                        }
                    ]
                },
                {
                    text: "框架设计概览",
                    items: [
                        {
                            text: "权衡的艺术",
                            link: "/Vue/框架设计概览/权衡的艺术"
                        },
                        {
                            text: "框架设计的核心要素",
                            link: "/Vue/框架设计概览/框架设计的核心要素"
                        },
                        {
                            text: "Vue.js3的设计思路",
                            link: "/Vue/框架设计概览/Vue.js3的设计思路"
                        }
                    ]
                },
                {
                    text: "响应系统",
                    items: [
                        {
                            text: "响应系统的作用与实现",
                            link: "/Vue/响应系统/响应系统的作用与实现"
                        },
                        {
                            text: "非原始值的响应式方案",
                            link: "/Vue/响应系统/非原始值的响应式方案"
                        },
                        {
                            text: "原始值的响应式方案",
                            link: "/Vue/响应系统/原始值的响应式方案"
                        }
                    ]
                },
                {
                    text: "渲染器",
                    items: [
                        {
                            text: "渲染器的设计",
                            link: "/Vue/渲染器/渲染器的设计"
                        },
                        {
                            text: "挂载与更新",
                            link: "/Vue/渲染器/挂载与更新"
                        },
                        {
                            text: "简单 Diff 算法",
                            link: "/Vue/渲染器/简单 Diff 算法"
                        },
                        {
                            text: "双端 Diff 算法",
                            link: "/Vue/渲染器/双端 Diff 算法"
                        },
                        {
                            text: "快速 Diff 算法",
                            link: "/Vue/渲染器/快速 Diff 算法"
                        }
                    ]
                },
                {
                    text: "组件化",
                    items: [
                        {
                            text: "组件的实现原理",
                            link: "/Vue/组件化/组件的实现原理"
                        },
                        {
                            text: "异步组件与函数式组件",
                            link: "/Vue/组件化/异步组件与函数式组件"
                        },
                        {
                            text: "内建组件和模块",
                            link: "/Vue/组件化/内建组件和模块"
                        }
                    ]
                },
                {
                    text: "编译器",
                    items: [
                        {
                            text: "编译器核心技术概览",
                            link: "/Vue/编译器/编译器核心技术概览"
                        },
                        {
                            text: "解析器",
                            link: "/Vue/编译器/解析器"
                        },
                        {
                            text: "编译优化",
                            link: "/Vue/编译器/编译优化"
                        }
                    ]
                },
                {
                    text: "服务端渲染",
                    items: [
                        {
                            text: "同构渲染",
                            link: "/Vue/服务端渲染/同构渲染"
                        }
                    ]
                }
            ],

            "旅行计划": [
                {
                    text: "旅行计划",
                    items: [
                        {
                            text: "云南",
                            link: "/旅行计划/云南"
                        },
                        // {
                        //     text: "四川",
                        //     link: "/旅行计划/四川"
                        // },
                    ]
                }
            ],
            "/interview/": [
                {
                    text: "面试相关",
                    items: [
                        {
                            text: 'vue',
                            link: '/interview/vue'
                        },
                        {
                            text: "react",
                            link: "/interview/react"
                        },
                        {
                            text: "JavaScript基础",
                            link: "/interview/JavaScript基础"
                        },
                        {
                            text: "浏览器",
                            link: "/interview/浏览器"
                        },
                        {
                            text: "杂项",
                            link: "/interview/杂项"
                        },
                        {
                            text: "计算机网络",
                            link: "/interview/计算机网络"
                        },
                        {
                            text: "数据结构",
                            link: "/interview/数据结构"
                        }
                    ]
                }
            ]
        }
    }
})