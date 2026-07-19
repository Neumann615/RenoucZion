import type { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.Config['nav'] = [
    { text: '导航', link: '/nav', activeMatch: '^/nav' },
    {
        text: "编程语言",
        items: [
            {
                text: "JavaScript",
                link: "JavaScript/basic/introduction",
            },
            {
                text: "ES6标准入门",
                link: "ES6标准入门/intro",
            },
            {
                text: "TypeScript",
                link: "TypeScript/intro",
            },
        ],
    },
    {
        text: '主流框架',
        items: [
            {
                text: "Vue",
                link: "Vue/框架设计概览/权衡的艺术",
            },
            {
                text: "React",
                link: "React/basic/introduce",
            },
        ]
    },
    {
        text: '笔记',
        items: [
            {
                text: "面试题",
                link: "interview/面试题/基础面试题",
            },
            {
                text: "教资资格证",
                link: "教师资格证/教育教学知识与能力/教育基础(上)",
            },
            {
                text: "前端工程化",
                link: "前端工程化/index"
            },
            {
                text: '常用工具方法',
                link: "工具方法/index"
            },
            {
                text: 'Git',
                link: "Git/提交类型"
            },
            {
                text: 'AI',
                link: "AI/ai-concepts-guide"
            }
        ]
    },
    {
        text: '金融知识',
        items: [
            {
                text: '银行',
                items: [
                    {
                        text: '银行基础',
                        link: "/金融知识/银行/银行基础"
                    },
                    {
                        text: '银行业务',
                        link: "/金融知识/银行/银行业务"
                    },
                    {
                        text: '银行监管',
                        link: "/金融知识/银行/银行监管"
                    },
                    {
                        text: '银行产品',
                        link: "/金融知识/银行/银行产品"
                    }
                ]
            },
            {
                text: '证券',
                items: [
                    {
                        text: '证券基础',
                        link: "/金融知识/证券/证券基础"
                    },
                    {
                        text: '项目承做',
                        link: "/金融知识/证券/项目承做"
                    },
                    {
                        text: '项目发行',
                        link: "/金融知识/证券/项目发行"
                    },
                    {
                        text: '项目后续',
                        link: "/金融知识/证券/项目后续"
                    },
                    {
                        text: '证券监管',
                        link: "/金融知识/证券/证券监管"
                    }
                ]
            },
            {
                text: '保险',
                items: [
                    {
                        text: '保险基础',
                        link: "/金融知识/保险/保险基础"
                    },
                    {
                        text: '保险产品',
                        link: "/金融知识/保险/保险产品"
                    },
                    {
                        text: '保险业务流程',
                        link: "/金融知识/保险/保险业务流程"
                    },
                    {
                        text: '保险监管',
                        link: "/金融知识/保险/保险监管"
                    }
                ]
            },
            {
                text: '信托',
                items: [
                    {
                        text: '信托基础',
                        link: "/金融知识/信托/信托基础"
                    },
                    {
                        text: '信托产品',
                        link: "/金融知识/信托/信托产品"
                    },
                    {
                        text: '信托业务流程',
                        link: "/金融知识/信托/信托业务流程"
                    },
                    {
                        text: '信托监管',
                        link: "/金融知识/信托/信托监管"
                    }
                ]
            }
        ]
    }
]