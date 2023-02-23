import { h } from 'vue'
import Theme from 'vitepress/theme'
import './styles/vars.css'
export default {
    ...Theme,
    // Layout() {
    //   return h(Theme.Layout, null, {
    //     //'home-features-after': () => h(HomeSponsors),
    //     //'aside-ads-before': () => h(AsideSponsors)
    //   })
    // },
    enhanceApp({ app }) {
        //app.component('SvgImage', SvgImage)
        //app.component("WhiteboardDemo", WhiteboardDemo)
    }
}