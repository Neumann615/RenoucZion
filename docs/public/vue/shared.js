/**
 * @vue/shared v3.5.26
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
// @__NO_SIDE_EFFECTS__
// 接收一个以逗号分隔的字符串作为输入，构建一个内部的键映射，并返回一个新函数。返回的函数可以用来快速检查优化查找操作。
function makeMap(str) {
    const map = /* @__PURE__ */ Object.create(null);
    for (const key of str.split(",")) map[key] = 1;
    return (val) => val in map;
}

const EMPTY_OBJ = !!('production' !== 'production') ? Object.freeze({}) : {};
const EMPTY_ARR = !!('production' !== 'production') ? Object.freeze([]) : [];
const NOOP = () => {
};
const NO = () => false;
// 检测属性名是否以"on"开头且第三个字符不是小写字母，通常用于识别事件处理属性（如onClick, onChange等）
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
    (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
// 判断属性名是否以onUpdate:开头
const isModelListener = (key) => key.startsWith("onUpdate:");
// 一个别名，主要用做对象合并
const extend = Object.assign;
// 从数组中移除某一个元素
const remove = (arr, el) => {
    const i = arr.indexOf(el);
    if (i > -1) {
        arr.splice(i, 1);
    }
};
// 一个别名，获取Object.prototype.hasOwnProperty方法的直接引用
const hasOwnProperty = Object.prototype.hasOwnProperty;
// 检查一个对象是否自身拥有某个属性（而非从原型链继承的）
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isDate = (val) => toTypeString(val) === "[object Date]";
const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
    return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
// 对 Object.prototype.toString方法的引用，用于获取任意值的内部类型标签。这是 JavaScript 中最精确的类型检查方法。
const objectToString = Object.prototype.toString;
// objectToString的调用封装，用于获取任意值的完整内部类型标签字符串，格式为 "[object Type]"。
const toTypeString = (value) => objectToString.call(value);
// 获取精确的类型名称 Number、String、Boolean、Null、Object、Array等
const toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
};
// 判断一个值是否为"纯对象"（plain object），即通过对象字面量 {}或 new Object()创建的对象，而不是其他内置对象类型。
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
// isIntegerKey函数用于判断一个键（key）是否是一个有效的整数键，常用于判断数组索引或可以作为整数使用的属性名。
// 四个条件必须全部满足：
// 1. 必须是字符串
// 2. 不能是字符串 "NaN"
// 3. 不能以负号开头
// 4. 转换为整数再转回字符串后必须与原始字符串相等
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
// isReservedProp是一个通过 makeMap创建的检查函数，用于判断给定的属性名是否是 Vue 的保留属性。这些保留属性是 Vue 内部使用或有特殊含义的属性，不应作为普通属性传递给组件。
const isReservedProp = /* @__PURE__ */ makeMap(
    // the leading comma is intentional so empty string "" is also included
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
// 判断给定的指令名是否是 Vue 的内置指令。
const isBuiltInDirective = /* @__PURE__ */ makeMap(
    "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
);
// 创建带有缓存功能的字符串处理函数。它接收一个处理字符串的函数，返回一个新的函数，这个新函数会对相同的输入字符串进行缓存，避免重复计算。
const cacheStringFunction = (fn) => {
    const cache = /* @__PURE__ */ Object.create(null);
    return ((str) => {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
    });
};
// 匹配连字符（-）后面跟着的单词字符，用于将连字符分隔的字符串转换为驼峰命名。
const camelizeRE = /-\w/g;
// 将 kebab-case（短横线分隔）的字符串转换为 camelCase（驼峰）命名。它通过 cacheStringFunction进行缓存优化，对相同输入只计算一次。
const camelize = cacheStringFunction(
    (str) => {
        return str.replace(camelizeRE, (c) => c.slice(1).toUpperCase());
    }
);
// 匹配大写字母，并在其前面插入连字符，用于将 camelCase（驼峰）命名转换为 kebab-case（连字符分隔）命名。这是 camelize函数的反向操作。
const hyphenateRE = /\B([A-Z])/g;
// 带缓存的字符串处理函数，用于将 camelCase（驼峰）命名的字符串转换为 kebab-case（连字符分隔）命名，并全部转换为小写。这是 Vue 中用于处理命名格式转换的核心工具函数。
const hyphenate = cacheStringFunction(
    (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
// 带缓存的字符串处理函数，用于将字符串的首字母转换为大写，其余字母保持不变。这是 Vue 中用于处理字符串格式化的基础工具函数。
const capitalize = cacheStringFunction((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
});
// 带缓存的字符串处理函数，用于将事件名转换为对应的事件处理器的属性名。它将给定的字符串转换为 on前缀加上首字母大写的格式，这是 Vue 中事件处理器属性的命名规范。
// click => onClick
const toHandlerKey = cacheStringFunction(
    (str) => {
        const s = str ? `on${capitalize(str)}` : ``;
        return s;
    }
);
// 比较两个值是否发生变化的函数
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
// 顺序调用函数数组中所有函数，并将传入的参数传递给每个被调用的函数。
const invokeArrayFns = (fns, ...arg) => {
    for (let i = 0; i < fns.length; i++) {
        fns[i](...arg);
    }
};
// Object.defineProperty的封装函数，用于在对象上定义具有特定属性的描述符。它提供了一种简洁的方式来定义不可枚举、可配置的属性，并可选择是否可写。
const def = (obj, key, value, writable = false) => {
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: false,
        writable,
        value
    });
};
// 宽松的数字转换函数，尝试将输入值转换为数字，如果转换失败（得到 NaN）,则返回原始值。这常用于处理模板中可能包含数字的字符串属性。
const looseToNumber = (val) => {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
};
// 字符串转数字的转换函数，它使用 Number()构造函数进行转换，但只对字符串类型进行转换尝试，非字符串类型直接返回原始值。与 looseToNumber不同的是，它使用 Number()而非 parseFloat()，转换逻辑更严格。
const toNumber = (val) => {
    const n = isString(val) ? Number(val) : NaN;
    return isNaN(n) ? val : n;
};
// getGlobalThis是一个用于安全获取全局对象的函数，它通过惰性求值和缓存机制，确保在各种 JavaScript 环境（浏览器、Node.js、Web Worker 等）中都能正确获取到全局对象。
let _globalThis;
const getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
// 检查字符串是否符合 JavaScript 标识符命名规范的正则表达式。它用于验证变量名、函数名、属性名等在 JavaScript 中是否合法。
const identRE = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;
// 代码生成函数，用于根据属性名生成访问 props 的表达式。它通过检查属性名是否符合 JavaScript 标识符规范，来决定是使用点号访问还是方括号访问语法。
function genPropsAccessExp(name) {
    return identRE.test(name) ? `__props.${name}` : `__props[${JSON.stringify(name)}]`;
}
// 生成缓存键的函数，它将源数据和配置选项组合成一个唯一的字符串键。特别之处在于它能够处理函数类型的选项值，将函数转换为字符串表示形式。
function genCacheKey(source, options) {
    return source + JSON.stringify(
        options,
        (_, val) => typeof val === "function" ? val.toString() : val
    );
}
// 虚拟 DOM 差异对比（diff）的优化标志系统。它是一个双向映射的枚举对象，用于标识虚拟节点（VNode）中哪些部分发生了变化，从而在更新时只对比和更新必要的部分，大幅提升性能。
const PatchFlags = {
    "TEXT": 1,
    "1": "TEXT",
    "CLASS": 2,
    "2": "CLASS",
    "STYLE": 4,
    "4": "STYLE",
    "PROPS": 8,
    "8": "PROPS",
    "FULL_PROPS": 16,
    "16": "FULL_PROPS",
    "NEED_HYDRATION": 32,
    "32": "NEED_HYDRATION",
    "STABLE_FRAGMENT": 64,
    "64": "STABLE_FRAGMENT",
    "KEYED_FRAGMENT": 128,
    "128": "KEYED_FRAGMENT",
    "UNKEYED_FRAGMENT": 256,
    "256": "UNKEYED_FRAGMENT",
    "NEED_PATCH": 512,
    "512": "NEED_PATCH",
    "DYNAMIC_SLOTS": 1024,
    "1024": "DYNAMIC_SLOTS",
    "DEV_ROOT_FRAGMENT": 2048,
    "2048": "DEV_ROOT_FRAGMENT",
    "CACHED": -1,
    "-1": "CACHED",
    "BAIL": -2,
    "-2": "BAIL"
};
// 从数字到名称的映射对象，用于将 patchFlag 的数值转换为人可读的字符串表示。它主要用于调试、日志记录和开发工具中，帮助开发者理解虚拟节点的 patchFlag 标志。
const PatchFlagNames = {
    [1]: `TEXT`,
    [2]: `CLASS`,
    [4]: `STYLE`,
    [8]: `PROPS`,
    [16]: `FULL_PROPS`,
    [32]: `NEED_HYDRATION`,
    [64]: `STABLE_FRAGMENT`,
    [128]: `KEYED_FRAGMENT`,
    [256]: `UNKEYED_FRAGMENT`,
    [512]: `NEED_PATCH`,
    [1024]: `DYNAMIC_SLOTS`,
    [2048]: `DEV_ROOT_FRAGMENT`,
    [-1]: `CACHED`,
    [-2]: `BAIL`
};
// ShapeFlags是 Vue 3 中用于标识虚拟节点（VNode）类型和特性的枚举对象。它是一个双向映射的枚举，通过位运算来高效地判断和组合虚拟节点的各种形态，是 Vue 3 虚拟 DOM 系统的核心类型标识系统。
const ShapeFlags = {
    "ELEMENT": 1,
    "1": "ELEMENT",
    "FUNCTIONAL_COMPONENT": 2,
    "2": "FUNCTIONAL_COMPONENT",
    "STATEFUL_COMPONENT": 4,
    "4": "STATEFUL_COMPONENT",
    "TEXT_CHILDREN": 8,
    "8": "TEXT_CHILDREN",
    "ARRAY_CHILDREN": 16,
    "16": "ARRAY_CHILDREN",
    "SLOTS_CHILDREN": 32,
    "32": "SLOTS_CHILDREN",
    "TELEPORT": 64,
    "64": "TELEPORT",
    "SUSPENSE": 128,
    "128": "SUSPENSE",
    "COMPONENT_SHOULD_KEEP_ALIVE": 256,
    "256": "COMPONENT_SHOULD_KEEP_ALIVE",
    "COMPONENT_KEPT_ALIVE": 512,
    "512": "COMPONENT_KEPT_ALIVE",
    "COMPONENT": 6,
    "6": "COMPONENT"
};
// SlotFlags是 Vue 3 中用于标识插槽类型和特性的枚举对象。它是一个双向映射的枚举，用于在编译和运行时确定插槽的行为特性，特别是用于插槽的动态性判断和性能优化。
const SlotFlags = {
    "STABLE": 1,
    "1": "STABLE",
    "DYNAMIC": 2,
    "2": "DYNAMIC",
    "FORWARDED": 3,
    "3": "FORWARDED"
};
// slotFlagsText是一个简单的映射对象，用于将插槽标志位（SlotFlags）的数值转换为人可读的字符串表示。它主要用于调试、日志记录和开发工具中，帮助开发者理解插槽的当前状态。
const slotFlagsText = {
    [1]: "STABLE",
    [2]: "DYNAMIC",
    [3]: "FORWARDED"
};

// GLOBALS_ALLOWED定义了 Vue 模板中允许访问的全局变量白名单
const GLOBALS_ALLOWED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol";
// 基于这个白名单的快速查找函数，用于检查一个标识符是否在允许的全局变量列表中。这是 Vue 模板编译安全机制的重要组成部分
const isGloballyAllowed = /* @__PURE__ */ makeMap(GLOBALS_ALLOWED);
const isGloballyWhitelisted = isGloballyAllowed;

const range = 2;
// 生成代码帧的函数，用于在编译错误、运行时错误或其他调试场景中显示源代码片段。它能够高亮显示源代码中的特定位置，并提供上下文信息，帮助开发者快速定位问题。
function generateCodeFrame(source, start = 0, end = source.length) {
    start = Math.max(0, Math.min(start, source.length));
    end = Math.max(0, Math.min(end, source.length));
    if (start > end) return "";
    let lines = source.split(/(\r?\n)/);
    const newlineSequences = lines.filter((_, idx) => idx % 2 === 1);
    lines = lines.filter((_, idx) => idx % 2 === 0);
    let count = 0;
    const res = [];
    for (let i = 0; i < lines.length; i++) {
        count += lines[i].length + (newlineSequences[i] && newlineSequences[i].length || 0);
        if (count >= start) {
            for (let j = i - range; j <= i + range || end > count; j++) {
                if (j < 0 || j >= lines.length) continue;
                const line = j + 1;
                res.push(
                    `${line}${" ".repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`
                );
                const lineLength = lines[j].length;
                const newLineSeqLength = newlineSequences[j] && newlineSequences[j].length || 0;
                if (j === i) {
                    const pad = start - (count - (lineLength + newLineSeqLength));
                    const length = Math.max(
                        1,
                        end > count ? lineLength - pad : end - start
                    );
                    res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
                } else if (j > i) {
                    if (end > count) {
                        const length = Math.max(Math.min(end - count, lineLength), 1);
                        res.push(`   |  ` + "^".repeat(length));
                    }
                    count += lineLength + newLineSeqLength;
                }
            }
            break;
        }
    }
    return res.join("\n");
}

// 规范化样式输入的实用函数。它处理 Vue 中样式绑定的多种输入格式（数组、字符串、对象），将其转换为统一的标准化样式对象格式。
function normalizeStyle(value) {
    if (isArray(value)) {
        const res = {};
        for (let i = 0; i < value.length; i++) {
            const item = value[i];
            const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
            if (normalized) {
                for (const key in normalized) {
                    res[key] = normalized[key];
                }
            }
        }
        return res;
    } else if (isString(value) || isObject(value)) {
        return value;
    }
}
// 解析 CSS 样式字符串的正则表达式，它匹配分号但排除括号内的分号。这是处理 CSS 样式字符串时的关键工具，特别是在解析内联样式和 CSS 文本时。
const listDelimiterRE = /;(?![^(]*\))/g;
// 解析 CSS 属性声明的正则表达式。它匹配冒号并捕获冒号之后的所有内容，用于将 CSS 属性名和属性值分开。
const propertyDelimiterRE = /:([^]+)/;
// 匹配和移除 CSS 注释的正则表达式。它在 Vue 的样式处理系统中用于清理 CSS 文本，移除注释以便更准确地解析样式规则。
const styleCommentRE = /\/\*[^]*?\*\//g;
// 将 CSS 样式字符串解析为 JavaScript 对象的函数。它是 Vue 样式系统的核心解析器，能够正确处理 CSS 注释、分号分隔符和属性值分割。
function parseStringStyle(cssText) {
    const ret = {};
    cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
        if (item) {
            const tmp = item.split(propertyDelimiterRE);
            tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
        }
    });
    return ret;
}
// 将样式对象或字符串序列化为 CSS 样式字符串的函数。它是 parseStringStyle的反向操作，将 JavaScript 样式对象转换回内联样式字符串。
function stringifyStyle(styles) {
    if (!styles) return "";
    if (isString(styles)) return styles;
    let ret = "";
    for (const key in styles) {
        const value = styles[key];
        if (isString(value) || typeof value === "number") {
            const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
            ret += `${normalizedKey}:${value};`;
        }
    }
    return ret;
}
// 规范化 CSS 类名的函数，它将 Vue 中 class 绑定的各种格式（字符串、数组、对象）转换为标准化的、以空格分隔的类名字符串。这是 Vue 样式系统的核心功能之一。
function normalizeClass(value) {
    let res = "";
    if (isString(value)) {
        res = value;
    } else if (isArray(value)) {
        for (let i = 0; i < value.length; i++) {
            const normalized = normalizeClass(value[i]);
            if (normalized) {
                res += normalized + " ";
            }
        }
    } else if (isObject(value)) {
        for (const name in value) {
            if (value[name]) {
                res += name + " ";
            }
        }
    }
    return res.trim();
}
// 规范化组件 props 的函数，专门处理 Vue 中 class和 style这两个特殊的 props。它将各种格式的 class 和 style 值转换为标准化的格式，确保组件内部能够一致地处理这些特殊属性。
function normalizeProps(props) {
    if (!props) return null;
    let {class: klass, style} = props;
    if (klass && !isString(klass)) {
        props.class = normalizeClass(klass);
    }
    if (style) {
        props.style = normalizeStyle(style);
    }
    return props;
}

const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
const MATH_TAGS = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics";
// 定义了 HTML 中的所有自闭合标签（void elements），这些标签在 HTML 中不能有结束标签，也不能包含子内容。这是模板编译、渲染和序列化中的重要概念。
const VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
const isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
const isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
const isMathMLTag = /* @__PURE__ */ makeMap(MATH_TAGS);
const isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS);
// 定义了 HTML 中的特殊布尔属性列表。这些属性是 HTML 中一类特殊的布尔属性，它们不会接收值，只要出现就表示 true，移除就表示 false。这是 Vue 在编译模板时需要特殊处理的属性。
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
// 检查属性名是否为布尔属性的函数。它基于 specialBooleanAttrs扩展了完整的 HTML 布尔属性列表，通过 makeMap创建一个高性能的查找函数。
const isBooleanAttr = /* @__PURE__ */ makeMap(
    specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`
);
// 判断布尔属性是否应该被包含在 DOM 中的辅助函数。它决定了布尔属性在渲染时是否应该被设置为属性。
function includeBooleanAttr(value) {
    return !!value || value === "";
}
// 检测属性值中不安全字符的正则表达式。它在 Vue 的模板编译和属性序列化中用于安全性检查，防止 XSS 攻击。
const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
const attrValidationCache = {};
// 检查属性名在服务端渲染（SSR）中是否安全的函数。它通过缓存机制提高性能，并检测属性名中可能存在的危险字符。
function isSSRSafeAttrName(name) {
    if (attrValidationCache.hasOwnProperty(name)) {
        return attrValidationCache[name];
    }
    const isUnsafe = unsafeAttrCharRE.test(name);
    if (isUnsafe) {
        console.error(`unsafe attribute name: ${name}`);
    }
    return attrValidationCache[name] = !isUnsafe;
}
// 将 React/Vue 风格的属性名映射到标准 HTML 属性名的映射对象。它处理 JavaScript 属性名（camelCase）和 HTML 属性名（kebab-case）之间的转换，以及一些特殊属性的映射。
const propsToAttrMap = {
    acceptCharset: "accept-charset",
    className: "class",
    htmlFor: "for",
    httpEquiv: "http-equiv"
};
// 检查属性名是否为已知 HTML 属性的函数。它通过 makeMap创建一个高性能的查找函数，包含了所有标准的 HTML 属性，用于验证和过滤属性。
const isKnownHtmlAttr = /* @__PURE__ */ makeMap(
    `accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,inert,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`
);
// 检查属性名是否为已知 SVG 属性的函数。它通过 makeMap创建一个高性能的查找函数，包含了所有标准的 SVG 属性，包括 SVG 特有的属性、样式属性和转换属性。
const isKnownSvgAttr = /* @__PURE__ */ makeMap(
    `xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xmlns:xlink,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`
);
// 检查属性名是否为已知 MathML 属性的函数。它通过 makeMap创建一个高性能的查找函数，包含了 MathML 特有的属性，用于数学公式的标记和样式控制。
const isKnownMathMLAttr = /* @__PURE__ */ makeMap(
    `accent,accentunder,actiontype,align,alignmentscope,altimg,altimg-height,altimg-valign,altimg-width,alttext,bevelled,close,columnsalign,columnlines,columnspan,denomalign,depth,dir,display,displaystyle,encoding,equalcolumns,equalrows,fence,fontstyle,fontweight,form,frame,framespacing,groupalign,height,href,id,indentalign,indentalignfirst,indentalignlast,indentshift,indentshiftfirst,indentshiftlast,indextype,justify,largetop,largeop,lquote,lspace,mathbackground,mathcolor,mathsize,mathvariant,maxsize,minlabelspacing,mode,other,overflow,position,rowalign,rowlines,rowspan,rquote,rspace,scriptlevel,scriptminsize,scriptsizemultiplier,selection,separator,separators,shift,side,src,stackalign,stretchy,subscriptshift,superscriptshift,symmetric,voffset,width,widths,xlink:href,xlink:show,xlink:type,xmlns`
);
// 检查属性值是否可渲染的函数。它判断属性值是否可以作为字符串、数字或布尔值被渲染到 DOM 中，过滤掉 null、undefined、对象、数组、函数等不可渲染的值。
function isRenderableAttrValue(value) {
    if (value == null) {
        return false;
    }
    const type = typeof value;
    return type === "string" || type === "number" || type === "boolean";
}
// 检测需要转义的 HTML 特殊字符的正则表达式。它在 Vue 的模板编译和字符串转义中用于防止 XSS 攻击，确保用户输入的内容被安全地嵌入到 HTML 中。
const escapeRE = /["'&<>]/;
// 高效的手动实现 HTML 转义函数，它通过遍历字符串并替换特殊字符为 HTML 实体，来防止 XSS 攻击。这个实现比简单的 replace调用更加高效，因为它避免了正则表达式的全局匹配。
function escapeHtml(string) {
    const str = "" + string;
    const match = escapeRE.exec(str);
    if (!match) {
        return str;
    }
    let html = "";
    let escaped;
    let index;
    let lastIndex = 0;
    for (index = match.index; index < str.length; index++) {
        switch (str.charCodeAt(index)) {
            case 34:
                escaped = "&quot;";
                break;
            case 38:
                escaped = "&amp;";
                break;
            case 39:
                escaped = "&#39;";
                break;
            case 60:
                escaped = "&lt;";
                break;
            case 62:
                escaped = "&gt;";
                break;
            default:
                continue;
        }
        if (lastIndex !== index) {
            html += str.slice(lastIndex, index);
        }
        lastIndex = index + 1;
        html += escaped;
    }
    return lastIndex !== index ? html + str.slice(lastIndex, index) : html;
}
// 用于剥离 HTML/XML 注释标记的正则表达式。它在 Vue 的模板编译和服务器端渲染中用于清理注释，确保生成的 HTML 是干净和符合规范的。
const commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
// 剥离 HTML/XML 注释标记
function escapeHtmlComment(src) {
    return src.replace(commentStripRE, "");
}
// 检测 CSS 自定义属性（CSS 变量）名中需要转义的特殊字符的正则表达式。它用于确保 CSS 变量名的合法性，防止语法错误和安全问题。
const cssVarNameEscapeSymbolsRE = /[ !"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g;
// 对 CSS 变量名进行转义的函数，支持单层和双层转义。这在处理嵌套的 CSS 变量引用时特别重要，尤其是在 JavaScript 模板字符串和 CSS 字符串中。
function getEscapedCssVarName(key, doubleEscape) {
    return key.replace(
        cssVarNameEscapeSymbolsRE,
        (s) => doubleEscape ? s === '"' ? '\\\\\\"' : `\\\\${s}` : `\\${s}`
    );
}
// 松散比较两个数组是否相等的函数。它通过递归调用 looseEqual函数来比较数组的每个元素，支持深度比较和类型转换。
function looseCompareArrays(a, b) {
    if (a.length !== b.length) return false;
    let equal = true;
    for (let i = 0; equal && i < a.length; i++) {
        equal = looseEqual(a[i], b[i]);
    }
    return equal;
}
// 松散比较两个值是否相等的函数。它支持多种类型的值比较，包括基本类型、Date 对象、Symbol、数组和对象，并处理类型转换。
function looseEqual(a, b) {
    if (a === b) return true;
    let aValidType = isDate(a);
    let bValidType = isDate(b);
    if (aValidType || bValidType) {
        return aValidType && bValidType ? a.getTime() === b.getTime() : false;
    }
    aValidType = isSymbol(a);
    bValidType = isSymbol(b);
    if (aValidType || bValidType) {
        return a === b;
    }
    aValidType = isArray(a);
    bValidType = isArray(b);
    if (aValidType || bValidType) {
        return aValidType && bValidType ? looseCompareArrays(a, b) : false;
    }
    aValidType = isObject(a);
    bValidType = isObject(b);
    if (aValidType || bValidType) {
        if (!aValidType || !bValidType) {
            return false;
        }
        const aKeysCount = Object.keys(a).length;
        const bKeysCount = Object.keys(b).length;
        if (aKeysCount !== bKeysCount) {
            return false;
        }
        for (const key in a) {
            const aHasKey = a.hasOwnProperty(key);
            const bHasKey = b.hasOwnProperty(key);
            if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
                return false;
            }
        }
    }
    return String(a) === String(b);
}
// 松散相等比较在数组中查找元素索引的函数。它通过 Array.prototype.findIndex结合 looseEqual来实现类型不敏感的元素查找。
function looseIndexOf(arr, val) {
    return arr.findIndex((item) => looseEqual(item, val));
}
// 检查值是否为 Vue 3 响应式引用（Ref）的函数。它通过检查对象上是否存在 __v_isRef属性来判断是否为 Ref 对象。
const isRef = (val) => {
    return !!(val && val["__v_isRef"] === true);
};
// 用于将任意值转换为适合显示的字符串的函数。它处理各种类型的值，包括字符串、null/undefined、数组、对象、Ref 等，并确保输出的字符串适合在 UI 中显示。
const toDisplayString = (val) => {
    return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? isRef(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
};
// 用于 JSON.stringify的自定义替换器函数，它特殊处理 Vue 的 Ref、Map、Set、Symbol 等 JavaScript 内置对象，使它们在 JSON 序列化时能更友好地显示。
const replacer = (_key, val) => {
    if (isRef(val)) {
        return replacer(_key, val.value);
    } else if (isMap(val)) {
        return {
            [`Map(${val.size})`]: [...val.entries()].reduce(
                (entries, [key, val2], i) => {
                    entries[stringifySymbol(key, i) + " =>"] = val2;
                    return entries;
                },
                {}
            )
        };
    } else if (isSet(val)) {
        return {
            [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
        };
    } else if (isSymbol(val)) {
        return stringifySymbol(val);
    } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
        return String(val);
    }
    return val;
};
// 用于将 Symbol 值转换为可读字符串的函数。它处理 Symbol 的描述符，并为没有描述符的 Symbol 提供默认索引。
const stringifySymbol = (v, i = "") => {
    var _a;
    return (
        // Symbol.description in es2019+ so we need to cast here to pass
        // the lib: es2016 check
        isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v
    );
};
// 规范化 CSS 变量值的函数。它处理各种类型的值，将其转换为适合 CSS 使用的字符串格式，并提供适当的默认值和错误处理。
function normalizeCssVarValue(value) {
    if (value == null) {
        return "initial";
    }
    if (typeof value === "string") {
        return value === "" ? " " : value;
    }
    if (typeof value !== "number" || !Number.isFinite(value)) {
        if (!!('production' !== 'production')) {
            console.warn(
                "[Vue warn] Invalid value used for CSS binding. Expected a string or a finite number but received:",
                value
            );
        }
    }
    return String(value);
}

export {
    EMPTY_ARR,
    EMPTY_OBJ,
    NO,
    NOOP,
    PatchFlagNames,
    PatchFlags,
    ShapeFlags,
    SlotFlags,
    camelize,
    capitalize,
    cssVarNameEscapeSymbolsRE,
    def,
    escapeHtml,
    escapeHtmlComment,
    extend,
    genCacheKey,
    genPropsAccessExp,
    generateCodeFrame,
    getEscapedCssVarName,
    getGlobalThis,
    hasChanged,
    hasOwn,
    hyphenate,
    includeBooleanAttr,
    invokeArrayFns,
    isArray,
    isBooleanAttr,
    isBuiltInDirective,
    isDate,
    isFunction,
    isGloballyAllowed,
    isGloballyWhitelisted,
    isHTMLTag,
    isIntegerKey,
    isKnownHtmlAttr,
    isKnownMathMLAttr,
    isKnownSvgAttr,
    isMap,
    isMathMLTag,
    isModelListener,
    isObject,
    isOn,
    isPlainObject,
    isPromise,
    isRegExp,
    isRenderableAttrValue,
    isReservedProp,
    isSSRSafeAttrName,
    isSVGTag,
    isSet,
    isSpecialBooleanAttr,
    isString,
    isSymbol,
    isVoidTag,
    looseEqual,
    looseIndexOf,
    looseToNumber,
    makeMap,
    normalizeClass,
    normalizeCssVarValue,
    normalizeProps,
    normalizeStyle,
    objectToString,
    parseStringStyle,
    propsToAttrMap,
    remove,
    slotFlagsText,
    stringifyStyle,
    toDisplayString,
    toHandlerKey,
    toNumber,
    toRawType,
    toTypeString
};
