# Rollup

Rollup 是一个现代化的 JavaScript 模块打包工具，以其高效、简洁和强大的功能深受开发者喜爱。无论是构建库还是优化项目性能，Rollup 都是一个值得尝试的工具。

---

## Rollup 的核心功能

### 模块化支持

Rollup 原生支持 **ES Modules**（ECMAScript 模块），这是 JavaScript 的官方模块标准。它能够：

- **处理 import 和 export 语句**，确保模块之间的依赖关系清晰且高效。
- **兼容 CommonJS 模块**，通过插件（如 `@rollup/plugin-commonjs`），让你可以无缝使用传统模块。

> **小贴士**：如果你的项目中有大量的第三方库，使用 `@rollup/plugin-node-resolve` 和 `@rollup/plugin-commonjs` 是一个不错的选择！

---

### Tree Shaking —— 精简你的代码

Rollup 的 **Tree Shaking** 功能可以通过静态分析代码，移除未使用的部分（也称为“死代码”），从而生成更小、更高效的打包文件。

- **为什么重要？**  
  对于构建库来说，Tree Shaking 尤其关键。库通常包含许多功能，但用户可能只需要其中的一部分。Rollup 会确保只打包用户实际使用的代码。

> **示例**：  
> 如果你的库中有 10 个函数，而用户只用到了 2 个，Rollup 会自动移除未使用的 8 个函数，生成一个更小的文件。

---

### 多格式输出 —— 一次打包，多种用途

Rollup 支持多种输出格式，满足不同场景的需求：

- **ESM**（ES Modules）：适合现代浏览器和 Node.js 环境。
- **CommonJS**：适合传统的 Node.js 项目。
- **UMD**（Universal Module Definition）：可以在浏览器和 Node.js 中通用。
- **IIFE**（立即执行函数表达式）：适合直接在浏览器中运行的脚本。
- **AMD**（Asynchronous Module Definition）：适合 RequireJS 等模块加载器。

> **实际应用场景**：  
> 如果你在构建一个库，建议同时输出 ESM 和 CommonJS 格式，以便兼容现代和传统项目。

---

### 插件系统 —— 功能扩展的利器

Rollup 提供了强大的插件系统，允许开发者根据需求扩展其功能。以下是一些常用插件：

- **`@rollup/plugin-node-resolve`**：解析第三方模块，支持从 `node_modules` 中导入依赖。
- **`@rollup/plugin-commonjs`**：将 CommonJS 模块转换为 ESM。
- **`rollup-plugin-terser`**：压缩代码，生成更小的文件。
- **`rollup-plugin-typescript`**：支持 TypeScript 项目。

> **快速上手**：  
> 在 Rollup 配置文件中添加插件非常简单，例如：

```javascript
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "esm",
  },
  plugins: [resolve(), commonjs(), terser()],
};
```
