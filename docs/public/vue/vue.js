/**
 * vue v3.5.26
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
import * as runtimeDom from './runtime-dom.js';
import {initCustomFormatter, registerRuntimeCompiler, warn} from './runtime-dom.js';

export * from './runtime-dom.js';
import {compile} from './compiler-dom.js';
import {isString, NOOP, genCacheKey, extend, generateCodeFrame} from './shared.js';

function initDev() {
    {
        initCustomFormatter();
    }
}

if (!!('production' !== 'production')) {
    initDev();
}
const compileCache = /* @__PURE__ */ Object.create(null);

function compileToFunction(template, options) {
    if (!isString(template)) {
        if (template.nodeType) {
            template = template.innerHTML;
        } else {
            !!('production' !== 'production') && warn(`invalid template option: `, template);
            return NOOP;
        }
    }
    const key = genCacheKey(template, options);
    const cached = compileCache[key];
    if (cached) {
        return cached;
    }
    if (template[0] === "#") {
        const el = document.querySelector(template);
        if (!!('production' !== 'production') && !el) {
            warn(`Template element not found or is empty: ${template}`);
        }
        template = el ? el.innerHTML : ``;
    }
    const opts = extend(
        {
            hoistStatic: true,
            onError: !!('production' !== 'production') ? onError : void 0,
            onWarn: !!('production' !== 'production') ? (e) => onError(e, true) : NOOP
        },
        options
    );
    if (!opts.isCustomElement && typeof customElements !== "undefined") {
        opts.isCustomElement = (tag) => !!customElements.get(tag);
    }
    const {code} = compile(template, opts);

    function onError(err, asWarning = false) {
        const message = asWarning ? err.message : `Template compilation error: ${err.message}`;
        const codeFrame = err.loc && generateCodeFrame(
            template,
            err.loc.start.offset,
            err.loc.end.offset
        );
        warn(codeFrame ? `${message}
${codeFrame}` : message);
    }

    const render = new Function("Vue", code)(runtimeDom);
    render._rc = true;
    return compileCache[key] = render;
}

registerRuntimeCompiler(compileToFunction);

export {compileToFunction as compile};
