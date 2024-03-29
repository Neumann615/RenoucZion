import {defineConfig, DefaultTheme} from 'vitepress'

const ogDescription = 'Next Generation Frontend Tooling'
const ogImage = 'https://vitejs.dev/og-image.png'
const ogTitle = 'Vite'
const ogUrl = 'https://vitejs.dev'


export default defineConfig({
    title: `Bupu-admin官方文档`,
    description: '一款基于react和antd定制的前端开发模板',
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
            copyright: 'Copyright © Bupu-admin'
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
                        text: "数据结构与算法",
                        link: "/ES6标准入门/ECMAScript简介及发展历史.md"
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