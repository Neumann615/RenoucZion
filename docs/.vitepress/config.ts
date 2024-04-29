import {defineConfig, DefaultTheme} from 'vitepress'

const ogDescription = 'Next Generation Frontend Tooling'
const ogImage = 'https://vitejs.dev/og-image.png'
const ogTitle = 'Bupu'
const ogUrl = 'https://xiaonuo.love'


export default defineConfig({
    title: `Bupu`,
    description: '小诺的个人博客',
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
            {icon: 'github', link: 'https://github.com/vitejs/vite'}
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
                        text: "ES6标准入门",
                        link: "/ES6标准入门/ECMAScript简介及发展历史.md"
                    },
                    {
                        text: "TypeScript",
                        link: "/TypeScript/intro.md"
                    }
                ]
            },
            {
                text: "框架理解",
                items: [
                    {
                        text: "Vue",
                        link: "/framework-analysis/vue.md"
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
        ],

        sidebar: {
            "/ES6标准入门/": [
                {
                    text: "ES6标准入门",
                    items: [
                        {
                            text: "ECMAScript简介及发展历史",
                            link: "/ES6标准入门/ECMAScript简介及发展历史"
                        },
                        {
                            text: "let和const命令",
                            link: "/ES6标准入门/let和const命令"
                        },
                        {
                            text: "变量的解构赋值",
                            link: "/ES6标准入门/变量的解构赋值"
                        },
                        {
                            text: "字符串的扩展",
                            link: "/ES6标准入门/字符串的扩展"
                        },
                        {
                            text: "正则的扩展",
                            link: "/ES6标准入门/正则的扩展"
                        },
                        {
                            text: "数值的扩展",
                            link: "/ES6标准入门/数值的扩展"
                        },
                        {
                            text: "函数的扩展",
                            link: "/ES6标准入门/函数的扩展"
                        },
                        {
                            text: "数组的扩展",
                            link: "/ES6标准入门/数组的扩展"
                        },
                        {
                            text: "对象的扩展",
                            link: "/ES6标准入门/对象的扩展"
                        },
                        {
                            text: "Symbol",
                            link: "/ES6标准入门/Symbol"
                        },
                        {
                            text: "Set和Map数据结构",
                            link: "/ES6标准入门/Set和Map数据结构"
                        },
                        {
                            text: "Proxy",
                            link: "/ES6标准入门/Proxy"
                        },
                        {
                            text: "Reflect",
                            link: "/ES6标准入门/Reflect"
                        },
                        {
                            text: "Promise对象",
                            link: "/ES6标准入门/Promise对象"
                        },
                        {
                            text: "Iterator和for...of循环",
                            link: "/ES6标准入门/Iterator和for...of循环"
                        },
                        {
                            text: "Generator函数的语法",
                            link: "/ES6标准入门/Generator函数的语法"
                        },
                        {
                            text: "Generator函数的异步应用",
                            link: "/ES6标准入门/Generator函数的异步应用"
                        },
                        {
                            text: "async函数",
                            link: "/ES6标准入门/async函数"
                        },
                        {
                            text: "Class的基本语法",
                            link: "/ES6标准入门/Class的基本语法"
                        },
                        {
                            text: "Class的继承",
                            link: "/ES6标准入门/Class的继承"
                        },
                        {
                            text: "修饰器",
                            link: "/ES6标准入门/修饰器"
                        },
                        {
                            text: "Module的语法",
                            link: "/ES6标准入门/Module的语法"
                        },
                        {
                            text: "Module的加载实现",
                            link: "/ES6标准入门/Module的加载实现"
                        },
                        {
                            text: "编程风格",
                            link: "/ES6标准入门/编程风格"
                        },
                        {
                            text: "读懂ECMAScript规格",
                            link: "/ES6标准入门/读懂ECMAScript规格"
                        },
                        {
                            text: "ArrayBuffer",
                            link: "/ES6标准入门/ArrayBuffer"
                        },
                        {
                            text: "TypedArray视图",
                            link: "/ES6标准入门/TypedArray视图"
                        },
                    ]
                }
            ],
            "/TypeScript/": [
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
                            link: "/TypeScript/d.ts"
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
                            link: "/TypeScript/tsconfig.json"
                        },
                        {
                            text: "tsc命令",
                            link: "/TypeScript/tsc"
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