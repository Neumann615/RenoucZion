import { EnhanceAppContext, useData } from 'vitepress'
import Theme from 'vitepress/theme'
import { h } from "vue"
import DefaultTheme from 'vitepress/theme'
import HomePage from './components/HomePage.vue'
// import Layout from './components/Layout.vue'
import NavLinks from './components/NavLinks.vue'
import './styles/layout.scss'
import './styles/vars.css'

import { 
    NolebaseEnhancedReadabilitiesMenu, 
    NolebaseEnhancedReadabilitiesScreenMenu, 
  } from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
  
  import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'

  import { 
    NolebaseGitChangelogPlugin 
  } from '@nolebase/vitepress-plugin-git-changelog/client'
  
  import '@nolebase/vitepress-plugin-git-changelog/client/style.css'

export default {
    ...Theme,
    Layout: () => {
        const props: Record<string, any> = {}
        // 获取 frontmatter
        // const { frontmatter } = useData()

        // /* 添加自定义 class */
        // if (frontmatter.value?.layoutClass) {
        //     props.class = frontmatter.value.layoutClass
        // }

        return  h(DefaultTheme.Layout, null, {
            // 为较宽的屏幕的导航栏添加阅读增强菜单
            'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu), 
            // 为较窄的屏幕（通常是小于 iPad Mini）添加阅读增强菜单
            'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu), 
          })
    },
    enhanceApp({ app, }: EnhanceAppContext) {
        app.component('NavLinks', NavLinks)
        app.component('HomePage', HomePage)
        app.use(NolebaseGitChangelogPlugin)  
    },

}