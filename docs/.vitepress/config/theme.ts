import { DefaultTheme } from "vitepress"
import { nav } from './nav'
import { search } from './search'
import { sidebar } from "./sidebar"

export const themeConfig: DefaultTheme.Config = {
    logo: "/logo.png",
    aside: true,
    socialLinks: [{ icon: "github", link: "https://github.com/Neumann615" }],
    darkModeSwitchTitle: '切换暗黑模式',
    lightModeSwitchTitle: '切换明亮模式',
    sidebarMenuLabel: '文章',
    returnToTopLabel: '返回顶部',
    lastUpdatedText: '最后更新',
    docFooter: {
        prev: '上一篇',
        next: '下一篇'
    },
    lastUpdated: {
        text: "更新时间",
    },
    outline: {
        level: 'deep', // 右侧大纲标题层级
        label: '目录', // 右侧大纲标题文本配置
    },
    footer: {
        message: '路在脚下',
        copyright: `Copyright © 2023-${new Date().getFullYear()} Z ❤ PuPu`,
    },
    search,
    nav,
    sidebar
}