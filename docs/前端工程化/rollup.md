# Rollup

## 一、什么是 Rollup？

Rollup​ 是一个 JavaScript 模块打包器，专注于将小块代码编译成大块、复杂的代码，特别适合打包库和框架。它的设计理念是 "Tree-shaking"优先，能够自动删除未使用的代码，生成更小、更高效的 bundle。

## 二、核心设计理念

### 1.Tree-shaking

Rollup 默认启用 Tree-shaking，通过静态分析 ES6 模块的导入和导出，删除未使用的代码。

```javascript
// 输入代码
export const a = 1
export const b = 2
export const c = 3

// 如果只导入 a
import { a } from './module.js'

// 输出代码
const a = 1
export { a }
```

### 2.ES6 模块优先

Rollup 原生支持 ES6 模块标准，能够更好地进行静态分析和优化。

## 三、核心概念

### 1.入口(input)

```javascript
// rollup.config.js
export default {
  input: 'src/main.js', // 入口文件
  
  // 多入口配置
  input: ['src/index.js', 'src/utils.js'],
  
  // 对象形式的多入口
  input: {
    main: 'src/main.js',
    utils: 'src/utils.js'
  }
}
```

### 2. 输出 (Output)

```javascript
export default {
  output: {
    // 单文件输出
    file: 'dist/bundle.js',
    
    // 多文件输出
    dir: 'dist',
    
    // 输出格式
    format: 'es', // 'es' | 'cjs' | 'umd' | 'iife' | 'amd' | 'system'
    
    // 包名（umd 和 iife 格式需要）
    name: 'MyLibrary',
    
    // 源映射
    sourcemap: true,
    sourcemapFile: 'dist/bundle.js.map',
    
    // 代码拆分
    chunkFileNames: '[name]-[hash].js',
    entryFileNames: '[name].js',
    
    // 全局变量映射
    globals: {
      jquery: '$',
      lodash: '_'
    },
    
    // 外部模块不打包
    exports: 'named',
    
    // 严格模式
    strict: true
  }
}
```

### 3.输出格式对比

| 格式   | 描述         | 适用场景                            |
| ------ | ------------ | ----------------------------------- |
| es     | ES6模块      | 现代浏览器，支持 ES6 模块的打包工具 |
| cjs    | CommonJS     | Node.js 环境，老版本打包工具        |
| umd    | 通用模块     | 浏览器和 Node.js 都能使用           |
| iife   | 立即执行函数 | 浏览器，通过 `<script>`标签引入     |
| amd    | AMD模块      | RequireJS                           |
| system | SystemJS     | SystemJS 模块加载器                 |


## 四、插件系统

### 1.常用插件列表

```javascript
import resolve from '@rollup/plugin-node-resolve'      // 解析 node_modules
import commonjs from '@rollup/plugin-commonjs'        // 转换 CommonJS
import babel from '@rollup/plugin-babel'              // Babel 转译
import { terser } from 'rollup-plugin-terser'         // 代码压缩
import typescript from '@rollup/plugin-typescript'    // TypeScript
import json from '@rollup/plugin-json'                // JSON
import image from '@rollup/plugin-image'              // 图片
import postcss from 'rollup-plugin-postcss'           // CSS
import replace from '@rollup/plugin-replace'          // 字符串替换
import alias from '@rollup/plugin-alias'              // 路径别名
import eslint from '@rollup/plugin-eslint'            // ESLint
import dts from 'rollup-plugin-dts'                   // 生成 .d.ts
import livereload from 'rollup-plugin-livereload'     // 热重载
import serve from 'rollup-plugin-serve'               // 本地服务
```

### 2.基本插件配置

```javascript
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'

export default {
  plugins: [
    // 解析 node_modules 中的模块
    resolve({
      browser: true,  // 浏览器环境
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      preferBuiltins: false
    }),
    
    // 转换 CommonJS 模块
    commonjs({
      include: /node_modules/,
      requireReturnsDefault: 'auto'
    }),
    
    // Babel 转译
    babel({
      babelHelpers: 'bundled',  // 'bundled' | 'runtime' | 'inline' | 'external'
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    
    // JSON
    json(),
    
    // 代码压缩
    terser({
      compress: {
        drop_console: true
      }
    })
  ]
}
```

## 五、TypeScript 支持

```javascript
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'

// 主配置
export default {
  input: 'src/index.ts',
  output: [
    { file: 'dist/index.esm.js', format: 'es' },
    { file: 'dist/index.cjs.js', format: 'cjs' },
    { file: 'dist/index.umd.js', format: 'umd', name: 'MyLib' }
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false  // 不生成声明文件
    })
  ]
}

// 生成声明文件
export default {
  input: 'src/index.ts',
  output: { file: 'dist/index.d.ts', format: 'es' },
  plugins: [dts()]
}
```

## 六、CSS 处理

```javascript
import postcss from 'rollup-plugin-postcss'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'

export default {
  plugins: [
    postcss({
      // 提取 CSS 到单独文件
      extract: 'dist/style.css',
      
      // 内联 CSS
      inject: false,
      
      // 使用 CSS Modules
      modules: false,
      
      // 压缩 CSS
      minimize: true,
      
      // PostCSS 插件
      plugins: [
        autoprefixer(),
        cssnano()
      ],
      
      // 扩展名
      extensions: ['.css', '.scss', '.sass'],
      
      // 使用 sass
      use: [
        ['sass', { includePaths: ['src/styles'] }]
      ]
    })
  ]
}
```

## 七、外部依赖

```javascript
export default {
  // 外部依赖，不打包
  external: [
    'react',
    'react-dom',
    'lodash',
    'moment',
    /^@babel\/runtime/  // 正则匹配
  ],
  output: {
    // 定义全局变量
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      lodash: '_',
      moment: 'moment'
    }
  }
}
```

## 八、代码拆分

```javascript
export default {
  input: ['src/main.js', 'src/utils.js'],
  output: {
    dir: 'dist',
    format: 'es',
    
    // 代码拆分配置
    chunkFileNames: 'chunks/[name]-[hash].js',
    entryFileNames: '[name].js',
    
    // 共享块配置
    manualChunks(id) {
      if (id.includes('node_modules')) {
        // 将第三方库单独打包
        if (id.includes('react')) {
          return 'vendor-react'
        }
        if (id.includes('lodash')) {
          return 'vendor-lodash'
        }
        return 'vendor'
      }
    }
  }
}
```

## 九、开发环境配置

```javascript
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    // 本地服务器
    serve({
      open: true,
      contentBase: 'dist',
      port: 3000,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }),
    
    // 热重载
    livereload({
      watch: 'dist',
      delay: 300
    })
  ],
  
  // 监听文件变化
  watch: {
    include: 'src/**',
    exclude: 'node_modules/**'
  }
}
```

## 十、完整配置示例

### 1.基础库配置

```javascript
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    // ES 模块
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    },
    // CommonJS
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    // UMD
    {
      file: pkg.browser,
      format: 'umd',
      name: pkg.name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(''),
      sourcemap: true
    },
    // 压缩版本
    {
      file: pkg.browser.replace('.js', '.min.js'),
      format: 'umd',
      name: pkg.name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(''),
      plugins: [terser()]
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    resolve({
      browser: true
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', { 
          modules: false,
          targets: {
            browsers: ['> 1%', 'last 2 versions', 'not dead']
          }
        }]
      ]
    })
  ]
}
```

### 2.React组件库配置

```javascript
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import external from 'rollup-plugin-peer-deps-external'
import url from '@rollup/plugin-url'
import svgr from '@svgr/rollup'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
      sourcemap: true,
      exports: 'named'
    }
  ],
  plugins: [
    // 自动外部化 peerDependencies
    external(),
    
    // 解析路径
    resolve({
      extensions: ['.js', '.jsx']
    }),
    
    // 转换 CommonJS
    commonjs({
      include: /node_modules/
    }),
    
    // 处理 SVG
    svgr(),
    
    // 处理图片和字体
    url({
      limit: 8192,  // 8kb 以下转 base64
      include: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.woff', '**/*.woff2']
    }),
    
    // 处理 CSS
    postcss({
      modules: true,
      extract: 'styles.css',
      minimize: true
    }),
    
    // Babel
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [
        '@babel/preset-react',
        ['@babel/preset-env', { modules: false }]
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-private-methods'
      ]
    }),
    
    // 生产环境压缩
    process.env.NODE_ENV === 'production' && terser()
  ],
  external: ['react', 'react-dom']
}
```

### 3.多包配置（Monorepo）

```javascript
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'

// 基础配置
const createConfig = (pkg) => ({
  input: `packages/${pkg}/src/index.js`,
  output: [
    {
      file: `packages/${pkg}/dist/index.js`,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: `packages/${pkg}/dist/index.esm.js`,
      format: 'es',
      sourcemap: true
    }
  ],
  external: [
    'react',
    'react-dom',
    ...Object.keys(require(`./packages/${pkg}/package.json`).dependencies || {})
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    })
  ]
})

// 导出多个包配置
export default [
  createConfig('utils'),
  createConfig('components'),
  createConfig('hooks')
]
```

## 十一、对比Webpack

| 特性         | Rollup             | Webpack                  |
| ------------ | ------------------ | ------------------------ |
| 主要用途     | 库/框架打包        | 应用打包                 |
| Tree-shaking | 原生支持，效果极佳 | 支持，但不如 Rollup 彻底 |
| 代码分割     | 支持               | 更强大                   |
| 热更新       | 需要插件           | 内置支持                 |
| 配置复杂度   | 相对简单           | 较复杂                   |
| 构建速度     | 较快               | 较慢                     |
| 插件生态     | 较小但专注         | 非常丰富                 |
| 学习曲线     | 平缓               | 陡峭                     |
| 输出格式     | 多种格式           | 主要是iife/umd           |

## 十二、最佳实践

### 1. 配置文件组织

```javascript
// rollup.config.js
import { defineConfig } from 'rollup'
import { createConfig } from './rollup.config.base.js'

// 开发配置
const devConfig = defineConfig({
  ...createConfig(),
  output: {
    file: 'dist/bundle.js',
    format: 'es',
    sourcemap: 'inline'
  }
})

// 生产配置
const prodConfig = defineConfig({
  ...createConfig(),
  output: {
    file: 'dist/bundle.min.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    ...createConfig().plugins,
    terser()
  ]
})

export default [devConfig, prodConfig]
```

### 2. 性能优化

```javascript
// 使用缓存
import { rollup } from 'rollup'

let cache

export default {
  // 配置...
  cache,  // 传入缓存
  
  // 构建完成后更新缓存
  async function build() {
    const bundle = await rollup({
      input: 'src/main.js',
      cache
    })
    
    cache = bundle.cache
    
    await bundle.write({
      file: 'dist/bundle.js',
      format: 'es'
    })
  }
}
```

### 3. 自定义插件

```javascript
// 自定义插件示例
export default function myPlugin(options = {}) {
  return {
    name: 'my-plugin',
    
    // 构建开始
    buildStart() {
      console.log('构建开始...')
    },
    
    // 解析文件
    resolveId(source, importer) {
      if (source === 'virtual-module') {
        return source // 返回虚拟模块ID
      }
      return null // 其他情况交给下一个插件
    },
    
    // 加载文件
    load(id) {
      if (id === 'virtual-module') {
        return 'export default "这是一个虚拟模块"'
      }
      return null
    },
    
    // 转换代码
    transform(code, id) {
      if (id.endsWith('.custom')) {
        return {
          code: `export default ${JSON.stringify(code)}`,
          map: null
        }
      }
    },
    
    // 生成bundle
    generateBundle(options, bundle) {
      // 可以修改或添加文件
      bundle['extra-file.js'] = {
        fileName: 'extra-file.js',
        source: 'console.log("额外文件")',
        type: 'chunk'
      }
    },
    
    // 构建结束
    buildEnd(error) {
      if (error) {
        console.error('构建失败:', error)
      } else {
        console.log('构建成功!')
      }
    }
  }
}
```

## 十三、常见问题解决

### 1.循环依赖

```javascript
// rollup.config.js
export default {
  onwarn(warning, warn) {
    // 忽略循环依赖警告
    if (warning.code === 'CIRCULAR_DEPENDENCY') {
      return
    }
    warn(warning)
  }
}
```

### 2.动态导入

```javascript
// 使用 @rollup/plugin-dynamic-import-vars
import dynamicImportVariables from '@rollup/plugin-dynamic-import-vars'

export default {
  plugins: [
    dynamicImportVariables()
  ]
}
```

### 3.保留类名
```javascript
// 使用 @rollup/plugin-terser
import { terser } from 'rollup-plugin-terser'

export default {
  plugins: [
    terser({
      mangle: {
        keep_classnames: true,  // 保留类名
        keep_fnames: true       // 保留函数名
      }
    })
  ]
}
```

### 4.环境变量
```javascript
// 使用 @rollup/plugin-replace
import replace from '@rollup/plugin-replace'

export default {
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
      preventAssignment: true
    })
  ]
}
```

## 十五、常用命令

```json
// package.json
{
  "scripts": {
    "build": "rollup -c",
    "build:watch": "rollup -c -w",
    "build:prod": "NODE_ENV=production rollup -c",
    "build:analyze": "ANALYZE=true rollup -c",
    "dev": "rollup -c -w --environment NODE_ENV:development",
    "clean": "rm -rf dist"
  }
}
```

## 总结

Rollup 是一个专注于 JavaScript 库打包的优秀工具，其简洁的配置、优秀的 Tree-shaking 能力和多种输出格式支持，使其成为构建高质量 JavaScript 库的首选。虽然它在复杂应用场景下不如 Webpack 强大，但在其擅长的领域内表现出色