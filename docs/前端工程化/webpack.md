# Webpack

## 一、什么是 Webpack？

**Webpack** 是一个现代 JavaScript 应用程序的**静态模块打包器**。它将项目中的所有资源（JavaScript、CSS、图片、字体等）视为模块，通过分析模块之间的依赖关系，构建一个依赖图，然后将这些模块打包成一个或多个浏览器可识别的静态资源文件。

## 二、核心概念

### 1. 入口 (Entry)

入口是 Webpack 构建的起点，支持多种配置方式：

```javascript
// webpack.config.js
module.exports = {
// 单入口
entry: './src/index.js',
// 多入口
entry: {
app: './src/app.js',
admin: './src/admin.js'
},
// 动态入口
entry: () => './src/dynamic.js'
}
```

### 2. 输出 (Output)

控制打包结果的输出位置和命名规则：

```javascript
const path = require('path')
module.exports = {
    output: {
    // 输出目录（必须为绝对路径）
    path: path.resolve(__dirname, 'dist'),
    // 文件名模板
    filename: '[name].[contenthash:8].js',
    // 动态导入的模块输出名
    chunkFilename: '[name].[contenthash:8].chunk.js',
    // 公共路径（CDN、子路径部署）
    publicPath: '/',
    // 清理输出目录（Webpack 5）
    clean: true,
    // 资源文件输出路径
    assetModuleFilename: 'assets/[hash][ext][query]'
    }
}
```

### 3. 加载器 (Loaders)

Webpack 默认只能处理 JS 和 JSON 文件，Loader 用于处理其他类型文件：

```javascript
module.exports = {
    module: {
        rules: [
        // JavaScript/JSX
        {
            test: /.jsx?$/,
            exclude: /node_modules/,
            use: {
            loader: 'babel-loader',
            options: {presets: ['@babel/preset-env', '@babel/preset-react']}
        }
        },
        // TypeScript
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        },
        // CSS
        {
            test: /\.css$/,
            use: [
                'style-loader',
                {
                loader: 'css-loader',
                options: {
                    modules: true,
                    importLoaders: 1
                }
                },
                'postcss-loader'
            ]
        },
        // Sass/SCSS
        {
            test: /\.s[ac]ss$/i,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        },

        // 图片资源（Webpack 5 新方式）
        {
            test: /\.(png|jpg|jpeg|gif|svg)$/i,
            type: 'asset',
            parser: {
                dataUrlCondition: {
                maxSize: 8 * 1024 // 8kb以下转base64
                }
            }
        },
        // 字体文件
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource'
        }
        ]
    }
}
```

### 4. 插件 (Plugins)

插件用于执行更广泛的任务，如打包优化、资源管理、环境变量注入等：

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
module.exports = {
    plugins: [
        // 清理构建目录
        new CleanWebpackPlugin(),
        // 生成HTML文件
        new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        title: 'Webpack App',
        inject: 'body',
        minify: {
            collapseWhitespace: true,
            removeComments: true
        }
        }),

        // 提取CSS到单独文件
        new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].chunk.css'
        }),

        // 定义环境变量
        new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),

        // 自动加载模块
        new webpack.ProvidePlugin({
        React: 'react',
        _: 'lodash'
        }),
        // 模块热替换
        new webpack.HotModuleReplacementPlugin()
    ]
}
```

### 5. 模式 (Mode)

```javascript
module.exports = {
    mode: 'development', // 或 'production'、'none'
    // development: 启用调试工具，不压缩
    // production: 启用压缩、优化
}
```

## 三、开发环境配置

```javascript
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    // 开发服务器配置
    devServer: {
    static: {
    directory: path.join(__dirname, 'public'),
    },
    port: 3000,
    host: '0.0.0.0',
    open: true,
    hot: true,
    liveReload: true,
    compress: true,
    historyApiFallback: true,
    client: {
    overlay: {
    errors: true,
    warnings: false
    },
    progress: true
    },
    proxy: {
    '/api': {
    target: 'http://localhost:3001',
    changeOrigin: true,
    pathRewrite: { '^/api': '' }
    }
    }
    },
    // 缓存配置（Webpack 5）
    cache: {
    type: 'filesystem',
    buildDependencies: {
    config: [__filename]
    }
    },
    // 开发环境插件
    plugins: [
    new ReactRefreshWebpackPlugin()
    ],
    // 开发环境优化
    optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    minimize: false,
    concatenateModules: false
    }
}
```


## 四、生产环境配置

```javascript
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    // 性能提示
    performance: {
    hints: 'warning',
    maxEntrypointSize: 512 * 1024,
    maxAssetSize: 1024 * 1024
    },
    // 优化配置
    optimization: {
    minimize: true,
    minimizer: [
        new TerserPlugin({
            parallel: true,
            terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
            }
        }),
        new CssMinimizerPlugin()
    ],
    // 代码分割
    splitChunks: {
    chunks: 'all',
    minSize: 20000,
    minChunks: 1,
    maxAsyncRequests: 30,
    maxInitialRequests: 30,
    cacheGroups: {
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true
        },
        default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
        }
    }
    },

    // 运行时代码单独提取
    runtimeChunk: {
        name: 'runtime'
    }
    },
    // 生产环境插件
    plugins: [
        new CompressionPlugin({
            algorithm: 'gzip',
            test: /.(js|css)$/,
            threshold: 10240
        })
    ]
}
```

## 五、高级优化配置

### 1. 代码分割 (Code Splitting)

```javascript
{
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            maxSize: 244 * 1024, // 244KB
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            automaticNameDelimiter: '~',
            cacheGroups: {
                // 第三方库
                vendor: {
                    test: /[\/]node_modules[\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                // 公共模块
                common: {
                    minChunks: 2,
                    name: 'commons',
                    chunks: 'all',
                    priority: 5
                },
                // 样式文件
                styles: {
                    name: 'styles',
                    test: /.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    }
}
```

### 2. Tree Shaking

```javascript
// package.json
{
    "sideEffects": [
    "*.css",
    "*.scss",
    "@babel/polyfill"
    ]
}
// webpack.config.js
module.exports = {
    mode: 'production',
    optimization: {
        usedExports: true,
        sideEffects: true,
        concatenateModules: true
    }
}
```

### 3. 持久化缓存 (Webpack 5)

```javascript
{
    cache: {
        type: 'filesystem',
        version: '1.0',
        buildDependencies: {
        config: [__filename]
        },
        cacheDirectory: path.resolve(__dirname, '.webpack-cache')
    }
}
```

### 4. 模块联邦 (Module Federation)

```javascript
const { ModuleFederationPlugin } = require('webpack').container
// 应用1 (提供模块)
module.exports = {
plugins: [
new ModuleFederationPlugin({
        name: 'app1',
        filename: 'remoteEntry.js',
        exposes: {
        './Button': './src/components/Button',
        './utils': './src/utils'
        },
        shared: {
         react: { singleton: true, requiredVersion: '^17.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^17.0.0' }
        }
        })
        ]
    }
    // 应用2 (消费模块)
    module.exports = {
        plugins: [
        new ModuleFederationPlugin({
        name: 'app2',
        remotes: {
        app1: 'app1@http://localhost:3001/remoteEntry.js'
        },
        shared: {
         react: { singleton: true, requiredVersion: '^17.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^17.0.0' }
        }
    })
]
}
```

## 六、完整配置示例

```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[contenthash:8].js',
        chunkFilename: 'js/[name].[contenthash:8].chunk.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
        '@': path.resolve(__dirname, 'src')
        }
    },
    module: {
    rules: [
        {
            test: /.jsx?$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        },
        {
            test: /.css$/,
            use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader'
            ]
        },
        {
            test: /.(png|jpg|gif|svg)$/,
            type: 'asset',
            parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024
            }
        }
        }
    ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
        template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css'
        })
    ],
    devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        port: 3000,
        hot: true,
        open: true
    }
}
```

## 七、常用插件列表

| 插件名称                             | 作用                | 安装命令                                        |
| ------------------------------------ | ------------------- | ----------------------------------------------- |
| html-webpack-plugin                  | 生成 HTML 文件      | `npm i html-webpack-plugin -D`                  |
| clean-webpack-plugin                 | 清理构建目录        | `npm i clean-webpack-plugin -D`                 |
| mini-css-extract-plugin              | 提取 CSS 到单独文件 | `npm i mini-css-extract-plugin -D`              |
| compression-webpack-plugin           | 压缩资源文件        | `npm i compression-webpack-plugin -D`           |
| webpack-bundle-analyzer              | 打包分析工具        | `npm i webpack-bundle-analyzer -D`              |
| copy-webpack-plugin                  | 复制静态文件        | `npm i copy-webpack-plugin -D`                  |
| eslint-webpack-plugin                | ESLint 集成         | `npm i eslint-webpack-plugin -D`                |
| @pmmmwh/react-refresh-webpack-plugin | React 热更新        | `npm i @pmmmwh/react-refresh-webpack-plugin -D` |

## 八、常用 Loader 列表

| Loader 名称    | 作用                 | 安装命令                                              |
| -------------- | -------------------- | ----------------------------------------------------- |
| babel-loader   | 转译 ES6+ 代码       | `npm i babel-loader @babel/core @babel/preset-env -D` |
| ts-loader      | 处理 TypeScript      | `npm i ts-loader typescript -D`                       |
| css-loader     | 处理 CSS 文件        | `npm i css-loader -D`                                 |
| style-loader   | 将 CSS 注入到 DOM    | `npm i style-loader -D`                               |
| sass-loader    | 处理 Sass/SCSS       | `npm i sass-loader sass -D`                           |
| postcss-loader | 处理 CSS 前缀等      | `npm i postcss-loader postcss autoprefixer -D`        |
| file-loader    | 处理文件资源         | `npm i file-loader -D`                                |
| url-loader     | 将小文件转为 DataURL | `npm i url-loader -D`                                 |
| eslint-loader  | ESLint 检查          | `npm i eslint-loader eslint -D`                       |

## 九、常见问题解决

### 1. 构建速度慢

```javascript
// 优化方案
module.exports = {
    // 1. 使用持久化缓存
    cache: {
      type: 'filesystem'
    },
    // 2. 缩小文件搜索范围
    resolve: {
      alias: {
      '@': path.resolve(__dirname, 'src')
      },
      extensions: ['.js', '.jsx', '.json'],
      modules: [path.resolve(__dirname, 'node_modules')]
    },
    // 3. 使用多进程
    optimization: {
      minimizer: [
      new TerserPlugin({
        parallel: true
      })
    ]
    }
}
```

### 2. 内存溢出

增加 Node.js 内存限制

```bash
node --max-old-space-size=4096 node_modules/.bin/webpack
```

或在 package.json 中

```json
{
  "build": "node --max-old-space-size=4096 webpack"
}
```

### 3. 热更新失效

```javascript
{
    devServer: {
        hot: true,
        liveReload: false,
        client: {
        overlay: true
        }
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
}
```

## 十、最佳实践

1. **使用 Webpack 5+**：利用持久化缓存等新特性
2. **合理配置缓存**：显著提升构建速度
3. **代码分割**：提升应用加载性能
4. **Tree Shaking**：减少打包体积
5. **使用生产模式**：自动启用优化
6. **合理配置 Source Map**：development 用 cheap-module-source-map，production 用 source-map
7. **使用模块联邦**：实现微前端架构
8. **监控构建性能**：使用 speed-measure-webpack-plugin
9. **分析打包体积**：使用 webpack-bundle-analyzer
10. **渐进式升级**：从简单配置开始，逐步优化

## 总结

Webpack 是现代前端工程化的核心工具，虽然配置相对复杂，但提供了强大的功能和灵活的扩展性。掌握 Webpack 的配置和优化技巧，对于构建高性能、可维护的前端应用至关重要。建议从基础配置开始，逐步深入了解各个配置项的作用，结合实际项目需求进行优化。