# RenoucZion

> 象征知识库的理想国

## 访问地址

[https://www.zzzpupu.xin/](https://www.zzzpupu.xin/)

## 项目简介

RenoucZion 是一个基于 VitePress 构建的技术知识库，涵盖前端开发、面试题、AI 概念等多个领域，致力于为开发者提供系统、全面的学习资源。

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
# 或
npm run docs:dev
```

启动开发服务器，默认监听 `http://localhost:5173`，支持热更新。

### 构建生产版本

```bash
npm run build
# 或
npm run docs:build
```

构建产物输出到 `docs/.vitepress/dist` 目录。

### 预览生产版本

```bash
npm run serve
# 或
npm run docs:serve
```

在本地预览构建后的静态站点。

## 项目结构

```
RenoucZion/
├── docs/                              # 文档根目录
│   ├── AI/                            # AI 核心术语指南
│   ├── ES6标准入门/                   # ES6 语法教程
│   ├── Git/                           # Git 使用指南
│   ├── JavaScript/                    # JavaScript 完整文档
│   │   ├── async/                     # 异步编程
│   │   ├── basic/                     # 基础语法
│   │   ├── bom/                       # BOM 接口
│   │   ├── dom/                       # DOM 操作
│   │   ├── elements/                  # HTML 元素
│   │   ├── events/                    # 事件系统
│   │   ├── features/                  # 特性模块
│   │   ├── oop/                       # 面向对象
│   │   ├── operators/                 # 运算符
│   │   ├── stdlib/                    # 标准库
│   │   └── types/                     # 类型系统
│   ├── Nav/                           # 导航组件
│   ├── React/                         # React 学习指南
│   │   ├── basic/                     # 基础入门
│   │   ├── components/                # 组件设计
│   │   ├── css/                       # CSS 方案
│   │   ├── hooks/                     # Hooks 详解
│   │   ├── principle/                 # 原理剖析
│   │   ├── router/                    # 路由系统
│   │   ├── tools/                     # 工具链
│   │   └── zustand/                   # 状态管理
│   ├── TypeScript/                    # TypeScript 教程
│   ├── Vue/                           # Vue 3 设计与实现
│   │   ├── 响应系统/                  # 响应式原理
│   │   ├── 服务端渲染/                # SSR 方案
│   │   ├── 框架设计概览/              # 设计思路
│   │   ├── 渲染器/                    # 渲染原理
│   │   └── 示例代码/                  # 教学示例
│   ├── interview/                     # 面试题合集
│   │   ├── 基础框架/                  # React、Vue 等
│   │   ├── 计算机网络/                # 网络基础
│   │   ├── 语言相关/                  # JavaScript 等
│   │   └── 面试题/                    # 基础与进阶
│   └── .vitepress/                    # VitePress 配置
│       ├── config/                    # 配置模块
│       │   ├── data.ts                # 站点数据
│       │   ├── head.ts                # HTML head 配置
│       │   ├── markdown.ts            # Markdown 配置
│       │   ├── nav.ts                 # 导航栏配置
│       │   ├── search.ts              # 搜索配置
│       │   ├── sidebar.ts             # 侧边栏配置
│       │   └── theme.ts               # 主题配置
│       ├── theme/                     # 自定义主题
│       │   ├── components/            # 主题组件
│       │   ├── styles/                # 主题样式
│       │   ├── type/                  # 类型定义
│       │   ├── index.ts               # 主题入口
│       │   └── utils.ts               # 工具函数
│       └── config.ts                  # 主配置文件
├── package.json                       # 项目依赖
└── .gitignore                        # Git 忽略规则
```

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | VitePress | ^1.6.3 |
| 构建工具 | Vite | ^3.1.0 |
| 语言 | TypeScript | ^4.6.4 |
| UI 框架 | Vue | ^3.4.27 |
| 样式 | SCSS | ^1.85.1 |
| Markdown 扩展 | markdown-it | - |
| 增强插件 | Nolebase Integrations | ^2.16.0 |

## 脚本说明

| 脚本 | 模式 | 用途 | 产物 |
|------|------|------|------|
| `dev` / `docs:dev` | 开发 | 启动本地开发服务器，支持热更新 | 无 |
| `build` / `docs:build` | 生产 | 构建静态站点 | `docs/.vitepress/dist` |
| `serve` / `docs:serve` | 预览 | 预览构建后的静态站点 | 无 |

## 参考及借鉴

- [react-docs](https://github.com/message163/react-docs)
- [typescript-tutorial](https://github.com/wangdoc/typescript-tutorial)
- [nolebase-integrations](https://nolebase-integrations.ayaka.io/pages/zh-CN/)