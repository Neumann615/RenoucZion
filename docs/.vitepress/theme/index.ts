import { EnhanceAppContext, useData } from 'vitepress'
import Theme from 'vitepress/theme'
import { h } from "vue"
import HomePage from './components/HomePage.vue'
import Layout from './components/Layout.vue'
import NavLinks from './components/NavLinks.vue'
import './styles/layout.scss'
import './styles/vars.css'

export default {
    ...Theme,
    Layout: () => {
        const props: Record<string, any> = {}
        // 获取 frontmatter
        const { frontmatter } = useData()

        /* 添加自定义 class */
        if (frontmatter.value?.layoutClass) {
            props.class = frontmatter.value.layoutClass
        }

        return h(Layout, props)
    },
    enhanceApp({ app, }: EnhanceAppContext) {
        app.component('NavLinks', NavLinks)
        app.component('HomePage', HomePage)
    },

}