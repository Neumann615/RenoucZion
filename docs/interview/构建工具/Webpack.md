# webpack

## 核心概念

1. **Entry（入口点）**：指明 Webpack 应该从哪个模块开始解析依赖图。
2. **Output（输出）**：配置打包后的文件存放位置和名称。
3. **Loader（加载器）**：用于处理非JavaScript模块，如将CSS、图片等转换为模块。
4. **Plugin（插件）**：用于执行范围更广的任务，比如代码拆分、优化、压缩等。
5. **Mode（模式）**：有development和production两种，影响Webpack的优化程度和构建速度。

## 工作流程

1. **初始化**：读取配置文件，合并Shell命令行选项，创建编译器对象。
2. **编译**：从入口文件开始解析依赖，构建依赖图谱。
3. **加载器处理**：根据依赖图谱中的资源类型，使用对应的Loader转换代码。
4. **Plugin执行**：在编译的不同阶段触发插件，执行优化、资源处理等操作。
5. **输出**：将处理后的模块打包成一个或多个文件，并输出到指定目录。

## 解释Loader和Plugin的区别，并各举一个例子

### Loader（加载器）

Loader是Webpack用来预处理文件的转换器。它们可以让Webpack理解并处理非JavaScript文件（如CSS、图片、SVG、Markdown等），将其转换为Webpack能够管理和打包的模块。Loader是在文件被添加到模块图之前运行的，负责将资源转换成JavaScript模块。

`CSS Loader`
：当项目中包含CSS文件时，原始的Webpack不能直接处理这些文件。通过安装并配置css-loader，Webpack就能将CSS文件作为模块处理，进一步配合style-loader或MiniCssExtractPlugin.loader将CSS插入到DOM或提取到单独的CSS文件中。

### Plugin（插件）

Plugin是Webpack的扩展点，它们在编译时（compilation）提供更广泛的打包优化、资源管理和环境处理能力。与Loader相比，Plugin可以访问和操作Webpack的编译过程中的更多环节，执行更复杂的任务，如代码分割、资源优化、注入环境变量等，且不直接操作文件内容。

`HtmlWebpackPlugin`
：这是一个常用的Webpack插件，它会自动生成一个HTML文件，并自动将编译后的JavaScript文件（以及CSS等其他资源）注入到这个HTML中。这简化了项目部署，确保了每次构建时引用的脚本是最新的，特别适用于SPA（单页应用）项目。
总结来说，Loader专注于将非JavaScript资源转换为可被Webpack处理的模块，而Plugin则提供了一种机制来扩展Webpack的功能，实现更高级的构建和优化任务。两者结合使用，极大地增强了Webpack处理现代前端项目的能力。

## 什么是Tree Shaking？webpack如何实现它？

Tree Shaking
是一种代码优化技术，主要用于消除未使用的代码，从而减小打包后输出文件的体积。这一技术主要利用了ES模块（ESM）的静态导入导出特性，因为ES模块的导入导出关系在编译时就可以被静态分析确定，而不像CommonJS那样在运行时动态解析。

### 实现方式

1. **ES Module 语法支持**：Webpack 利用 ES6 模块的静态结构来进行静态分析。这意味着，如果代码是用 import 和 export 语句编写，Webpack
   可以识别哪些导出的成员实际上没有被其他模块导入使用，从而在打包时排除这些未被引用的代码。

2. **usedExports 分析**：Webpack
   会分析入口起点以及它们的依赖链，确定哪些导出的成员被实际使用。这个过程帮助Webpack识别哪些代码是“活”的（即被引用的），哪些是“死”的（即未被引用的），进而可以安全地去除未使用的导出。