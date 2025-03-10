import type { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.Config['nav'] = [
    {
        text: "前端知识",
        items: [
            {
                text: "JavaScript",
                link: "/JavaScript/basic/introduction",
            },
            {
                text: "ES6标准入门",
                link: "/ES6标准入门/intro",
            },
            {
                text: "TypeScript",
                link: "/TypeScript/intro",
            },
            {
                text: "Vue",
                link: "/Vue/框架设计概览/权衡的艺术",
            },
            {
                text: "React",
                link: "/React/basic/introduce",
            },
        ],
    },
    {
        text: '其他技能',
        items: [
            {
                text: "教资",
                link: "/教师资格证/教育教学知识与能力/教育基础(上)",
            }
        ]
    },
    {
        text: '笔记',
        items: [
            {
                text: "面试相关",
                link: "/interview/面试题/基础面试题",
            },
        ]
    },
    // {
    //     text: '关于',
    //     items: [
    //         {
    //             text: 'Z',
    //             link: '/about/z.md'
    //         },
    //         {
    //             text: 'PuPu',
    //             link: '/about/pupu.md'
    //         }
    //     ]
    // }
    // {
    //     text: "其他资源",
    //     items: [
    //         {
    //             text: "主流框架",
    //             items: [
    //                 {
    //                     text: "React",
    //                     link: "https://react.nodejs.cn/reference/react"
    //                 },
    //                 {
    //                     text: "Vue3",
    //                     link: "https://cn.vuejs.org/"
    //                 },
    //                 {
    //                     text: "Vue2",
    //                     link: "https://v2.cn.vuejs.org/"
    //                 }
    //             ]
    //         },
    //         {
    //             text: "组件库",
    //             items: [
    //                 {
    //                     text: 'ElementPlus',
    //                     link: 'https://element-plus.gitee.io/zh-CN/'
    //                 },
    //                 {
    //                     text: 'AntDesign',
    //                     link: 'https://ant-design.gitee.io/index-cn'
    //                 },
    //                 {
    //                     text: 'Vant',
    //                     link: 'https://vant-contrib.gitee.io/vant/#/zh-CN'
    //                 },
    //                 {
    //                     text: 'Varlet',
    //                     link: 'https://varlet.gitee.io/varlet-ui/#/zh-CN/home'
    //                 },
    //                 {
    //                     text: 'NaiveUI',
    //                     link: 'https://www.naiveui.com/zh-CN/os-theme'
    //                 }
    //             ]
    //         },
    //         {
    //             text: "构建工具",
    //             items: [
    //                 {
    //                     text: 'Webpack',
    //                     link: 'https://webpack.docschina.org/'
    //                 },
    //                 {
    //                     text: 'Vite',
    //                     link: 'http://www.vitejs.net/'
    //                 },
    //                 {
    //                     text: "Rspack",
    //                     link: "https://www.rspack.dev/zh/index.html"
    //                 },
    //                 {
    //                     text: "Gulp",
    //                     link: "https://www.gulpjs.com.cn/"
    //                 },
    //                 {
    //                     text: "Grunt",
    //                     link: "https://www.gruntjs.net/"
    //                 }
    //             ]
    //         },
    //         {
    //             text: "代码分析",
    //             items: [
    //                 {
    //                     text: 'ast语法解析',
    //                     link: 'https://astexplorer.net/'
    //                 },
    //                 {
    //                     text: 'js运行机制可视化',
    //                     link: 'https://www.jsv9000.app/'
    //                 }
    //             ]
    //         }
    //     ]
    // }
]