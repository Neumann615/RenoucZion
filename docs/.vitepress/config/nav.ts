import type { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.Config['nav'] = [
    { text: '导航', link: '/nav', activeMatch: '^/nav' },
    {
        text: "前端知识",
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
            {
                text: "Vue",
                link: "Vue/框架设计概览/权衡的艺术",
            },
            {
                text: "React",
                link: "React/basic/introduce",
            },
            {
                text: "前端工程化",
                link: "前端工程化/index"
            }
        ],
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
            }
        ]
    },
    {
        text: '工作日志',
        link: '/工作日志/深圳华云信息系统有限公司(招商证券)'
    }
]