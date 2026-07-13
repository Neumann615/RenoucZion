import type { HeadConfig } from 'vitepress';
import { metaData } from './data';

export const head: HeadConfig[] = [
    // ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', {rel: 'icon', type: 'image/svg+xml', href: '/logo.png'}],
    ['meta', { name: 'author', content: 'Z&R' }],
    ['meta', { name: 'keywords', content: '象征知识库的理想国' }],
    ['meta', { name: 'HandheldFriendly', content: 'True' }],
    ['meta', { name: 'MobileOptimized', content: '320' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: metaData.locale }],
    ['meta', { property: 'og:title', content: metaData.title }],
    ['meta', { property: 'og:description', content: metaData.description }],
    ['meta', { property: 'og:site_name', content: metaData.title }],
    ['meta', { property: 'og:image', content: metaData.image }],
];