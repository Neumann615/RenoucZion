
import type { Creator } from "../theme/type";
import { getAvatarUrlByGithubName } from "../theme/utils";

export const metaData = {
    lang: 'zh-CN',
    locale: 'zh_CN',
    title: 'RenoucZion',
    description: '象征知识库的理想国',
    image: `/logo.png`,
};

/** 文本 */
export const siteName = 'RenoucZion'
export const siteShortName = 'RenoucZion'
export const siteDescription = '象征知识库的理想国'

/** 创作者 */
export const creators: Creator[] = [
    {
        name: 'Z',
        avatar: '',
        username: 'Neumann615',
        title: `${siteName}作者`,
        desc: '前端开发,目前正朝着全栈和大前端方向发展',
        links: [
            { type: 'github', icon: 'github', link: 'https://github.com/Neumann615' },
            { type: 'wechat', icon: 'wechat', link: 'z-wx-qr-code.jpg' },
        ],
        nameAliases: ['Z', 'pupu', 'Neumann615'],
        emailAliases: ['2022095028@qq.com'],
    },
    {
        name: 'Renouc',
        avatar: '',
        username: 'Renouc',
        title: `${siteName}作者`,
        desc: '前端开发',
        links: [
            { type: 'github', icon: 'github', link: 'https://github.com/Renouc' },
            { type: 'wechat', icon: 'wechat', link: 'renouc-wx-qr-code.jpg' },
        ],
        nameAliases: [],
        emailAliases: [],
    },
].map<Creator>((c) => {
    c.avatar = c.avatar || getAvatarUrlByGithubName(c.username)
    return c as Creator
})
