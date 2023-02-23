import { defineConfig, DefaultTheme } from 'vitepress'

const ogDescription = 'Next Generation Frontend Tooling'
const ogImage = 'https://vitejs.dev/og-image.png'
const ogTitle = 'Vite'
const ogUrl = 'https://vitejs.dev'

// netlify envs
const deployURL = process.env.DEPLOY_PRIME_URL || ''
const commitRef = process.env.COMMIT_REF?.slice(0, 8) || 'dev'

const deployType = (() => {
    switch (deployURL) {
        case 'https://main--vite-docs-main.netlify.app':
            return 'main'
        case '':
            return 'local'
        default:
            return 'release'
    }
})()
const additionalTitle = ((): string => {
    switch (deployType) {
        case 'main':
            return ' (main branch)'
        case 'local':
            return ' (local)'
        case 'release':
            return ''
    }
})()
const versionLinks = ((): DefaultTheme.NavItemWithLink[] => {
    switch (deployType) {
        case 'main':
        case 'local':
            return [
                {
                    text: 'Vite 3 Docs (release)',
                    link: 'https://vitejs.dev'
                },
                {
                    text: 'Vite 2 Docs',
                    link: 'https://v2.vitejs.dev'
                }
            ]
        case 'release':
            return [
                {
                    text: 'Vite 2 Docs',
                    link: 'https://v2.vitejs.dev'
                }
            ]
    }
})()

export default defineConfig({
    title: `Bupu`,
    description: '个人博客',
    head: [
        ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:title', content: ogTitle }],
        ['meta', { property: 'og:image', content: ogImage }],
        ['meta', { property: 'og:url', content: ogUrl }],
        ['meta', { property: 'og:description', content: ogDescription }],
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
        ['meta', { name: 'twitter:site', content: '@vite_js' }],
        ['meta', { name: 'theme-color', content: '#646cff' }],
        // [
        //     'script',
        //     {
        //         src: 'https://cdn.usefathom.com/script.js',
        //         'data-site': 'CBDFBSLI',
        //         'data-spa': 'auto',
        //         defer: ''
        //     }
        // ]
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
            { icon: 'twitter', link: 'https://twitter.com/vite_js' },
            { icon: 'discord', link: 'https://chat.vitejs.dev' },
            { icon: 'github', link: 'https://github.com/vitejs/vite' }
        ],

        algolia: {
            appId: '7H67QR5P0A',
            apiKey: 'deaab78bcdfe96b599497d25acc6460e',
            indexName: 'vitejs',
            searchParameters: {
                facetFilters: ['tags:en']
            }
        },

        carbonAds: {
            code: 'CEBIEK3N',
            placement: 'vitejsdev'
        },

        localeLinks: {
            text: 'English',
            items: [
                { text: '简体中文', link: 'https://cn.vitejs.dev' },
                { text: '日本語', link: 'https://ja.vitejs.dev' },
                { text: 'Español', link: 'https://es.vitejs.dev' }
            ]
        },

        footer: {
            message: `Released under the MIT License. (${commitRef})`,
            copyright: 'Copyright © 2019-present Evan You & Vite Contributors'
        },

        nav: [
            {
                text: "基础知识",
                items: [
                    {
                        text: "ES6标准入门",
                        link: "/ES6标准入门/Javascript简介及发展历史.md"
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
                text: "面试",
                link: "/interview/vue"
            },
            {
                text: '配置',
                link: "/config/"
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
                        link: 'https://chat.vitejs.dev'
                    },
                    {
                        text: 'Vite',
                        link: 'https://chat.vitejs.dev'
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
                            text: "JavaScript简介及发展历史",
                            link: "/ES6标准入门/JavaScript简介及发展历史"
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
            "/interview/": [
                {
                    text: "面试相关",
                    items: [
                        {
                            text: 'vue',
                            link: '/interview/vue'
                        },
                        {
                            text: "JavaScript基础",
                            link: "/interview/JavaScript基础"
                        },
                        {
                            text:"杂项",
                            link:"/interview/杂项"
                        }
                    ]
                }
            ],
            '/guide/': [
                {
                    text: 'Guide',
                    items: [
                        {
                            text: 'Why Vite',
                            link: '/guide/why'
                        },
                        {
                            text: 'Getting Started',
                            link: '/guide/'
                        },
                        {
                            text: 'Features',
                            link: '/guide/features'
                        },
                        {
                            text: 'Using Plugins',
                            link: '/guide/using-plugins'
                        },
                        {
                            text: 'Dependency Pre-Bundling',
                            link: '/guide/dep-pre-bundling'
                        },
                        {
                            text: 'Static Asset Handling',
                            link: '/guide/assets'
                        },
                        {
                            text: 'Building for Production',
                            link: '/guide/build'
                        },
                        {
                            text: 'Deploying a Static Site',
                            link: '/guide/static-deploy'
                        },
                        {
                            text: 'Env Variables and Modes',
                            link: '/guide/env-and-mode'
                        },
                        {
                            text: 'Server-Side Rendering (SSR)',
                            link: '/guide/ssr'
                        },
                        {
                            text: 'Backend Integration',
                            link: '/guide/backend-integration'
                        },
                        {
                            text: 'Comparisons',
                            link: '/guide/comparisons'
                        },
                        {
                            text: 'Troubleshooting',
                            link: '/guide/troubleshooting'
                        },
                        {
                            text: 'Migration from v2',
                            link: '/guide/migration'
                        }
                    ]
                },
                {
                    text: 'APIs',
                    items: [
                        {
                            text: 'Plugin API',
                            link: '/guide/api-plugin'
                        },
                        {
                            text: 'HMR API',
                            link: '/guide/api-hmr'
                        },
                        {
                            text: 'JavaScript API',
                            link: '/guide/api-javascript'
                        },
                        {
                            text: 'Config Reference',
                            link: '/config/'
                        }
                    ]
                }
            ],
            '/config/': [
                {
                    text: 'Config',
                    items: [
                        {
                            text: 'Configuring Vite',
                            link: '/config/'
                        },
                        {
                            text: 'Shared Options',
                            link: '/config/shared-options'
                        },
                        {
                            text: 'Server Options',
                            link: '/config/server-options'
                        },
                        {
                            text: 'Build Options',
                            link: '/config/build-options'
                        },
                        {
                            text: 'Preview Options',
                            link: '/config/preview-options'
                        },
                        {
                            text: 'Dep Optimization Options',
                            link: '/config/dep-optimization-options'
                        },
                        {
                            text: 'SSR Options',
                            link: '/config/ssr-options'
                        },
                        {
                            text: 'Worker Options',
                            link: '/config/worker-options'
                        }
                    ]
                }
            ]
        }
    }
})