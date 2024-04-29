import {h} from 'vue'
import Theme from 'vitepress/theme'
import './styles/vars.css'
// 在.vitepress/index.js或其他自定义JavaScript文件中

export default {
    ...Theme
    // Layout() {
    //   return h(Theme.Layout, null, {
    //     'aside-ads-before': () => 12123,
    //   })
    // },
    // enhanceApp({app}) {
    //     //app.component('SvgImage', SvgImage)
    //     //app.component("WhiteboardDemo", WhiteboardDemo)
    // }
}